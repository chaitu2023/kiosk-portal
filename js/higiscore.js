HigiScore = (function () {
    function scoreReputation(sixMonthCheckins, weeksUserInSystem) {
        if (weeksUserInSystem < 1) {
            weeksUserInSystem = 1;
        }
        if (weeksUserInSystem > 26) {
            weeksUserInSystem = 26;
        }

        // Don't calculate more checkins per week than how long the user has actually existed
        if (sixMonthCheckins > weeksUserInSystem) {
            sixMonthCheckins = weeksUserInSystem;
        }

        return 450 * (sixMonthCheckins / weeksUserInSystem);
    }

    function scoreConsistency(twoMonthCheckins, weeksUserInSystem) {
        if (twoMonthCheckins <= 0) {
            return 0;
        }
        if (weeksUserInSystem < 1) {
            weeksUserInSystem = 1;
        }
        if (weeksUserInSystem > 8) {
            weeksUserInSystem = 8;
        }

        // Don't calculate more checkins per week than how long the user has actually existed
        if (twoMonthCheckins > weeksUserInSystem) {
            twoMonthCheckins = weeksUserInSystem;
        }

        var twoMonthsCheckinsTotal = 8;
        var paddedCheckins = twoMonthsCheckinsTotal - weeksUserInSystem;
        var checkins = twoMonthCheckins + paddedCheckins;

        return 450 * (checkins / twoMonthsCheckinsTotal);
    }

    function scoreRecency(weeklyCheckins) {
        var checkinLimit = 4;

        if (weeklyCheckins < 1) {
            weeklyCheckins = 1;
        }
        // Don't count the first checkin.
        weeklyCheckins--;

        // Don't calculate more checkins per week than the weekly limit
        if (weeklyCheckins > checkinLimit) {
            weeklyCheckins = checkinLimit;
        }

        return 99 * (weeklyCheckins / checkinLimit);
    }

    this.ScoreDiastolic = function (value) {
        var score;

        if (value <= 40) {
            score = 749.5;
        } else if (value > 40 && value <= 50) {
            score = (24.95 * value) - 248.5;
        } else if (value > 50 && value <= 79) {
            score = 999;
        } else if (value > 79 && value <= 110) {
            score = (-16.096774 * value) + 2270.645161;
        } else {
            score = 500;
        }

        return score;
    };

    this.ScoreSystolic = function (value) {
        var score;

        if (value <= 75) {
            score = 749.5;
        } else if (value > 75 && value <= 85) {
            score = (24.95 * value) - 1121.75;
        } else if (value > 85 && value <= 119) {
            score = 999;
        } else if (value > 119 && value <= 180) {
            score = (-8.180328 * value) + 1972.459016;
        } else {
            score = 500;
        }

        return score;
    };

    this.CalculateScoreAverage = function (scores) {
        var nonZeroScores = [],
            sum,
            average;

        for (var i = 0; i < scores.length; i++) {
            if (scores[i] > 0) {
                nonZeroScores.push(scores[i]);
            }
        }

        sum = 0;
        for (var j = 0; j < nonZeroScores.length; j++) {
            sum += nonZeroScores[j];
        }

        average = Math.round(sum / nonZeroScores.length);

        return average;
    };

    this.ScoreBmi = function (bmi) {
        var score;

        if (bmi <= 0) {
            score = 0;
        }
        else if (bmi <= 16) {
            score = 700;
        }
        else if (bmi > 16 && bmi <= 18.5) {
            score = (119.6 * bmi) - 1213.6;
        }
        else if (bmi > 18.5 && bmi <= 25) {
            score = (-15.230769 * bmi) + 1280.769231;
        }
        else if (bmi > 25 && bmi <= 35) {
            score = (-30 * bmi) + 1650;
        }
        else if (bmi > 35 && bmi <= 40) {
            score = -20 * bmi + 1300;
        }
        else {
            score = 500;
        }

        return Math.round(score);
    };

    this.ScoreBloodPressure = function (systolic, diastolic) {
        var score;

        if (systolic <= 0 || diastolic <= 0) {
            score = 0;
        }
        else {
            score = (this.ScoreSystolic(systolic) + this.ScoreDiastolic(diastolic)) / 2;
        }

        return Math.round(score);
    };

    this.ScoreKnowledge = function (sixMonthCheckins, twoMonthCheckins, weeklyCheckins, weeksUserInSystem, isFirstTimeUser) {
        var score;

        if (isFirstTimeUser) {
            return 500;
        }

        score = scoreReputation(sixMonthCheckins, weeksUserInSystem);
        score += scoreConsistency(twoMonthCheckins, weeksUserInSystem);
        score += scoreRecency(weeklyCheckins);

        return Math.round(score);
    };

    this.CalculateScore = function(checkin, sixMonthCheckins, twoMonthCheckins, weeklyCheckins, weeksUserInSystem, firstTime) {
        var bmi = 0;
        if (checkin.heightMeters && checkin.weightKG) {
            bmi = checkin.weightKG / (checkin.heightMeters * checkin.heightMeters);
        }

        if (!checkin.systolic) checkin.systolic = 0;
        if (!checkin.diastolic) checkin.diastolic = 0;

        var scoreBmi = this.ScoreBmi(bmi);
        var scoreBloodPressure = this.ScoreBloodPressure(checkin.systolic, checkin.diastolic);
        var scoreKnowledge = this.ScoreKnowledge(sixMonthCheckins, twoMonthCheckins, weeklyCheckins, weeksUserInSystem, firstTime);

        var scores = [scoreBmi, scoreBloodPressure, scoreKnowledge];
        var score = this.CalculateScoreAverage(scores);

        if (score > 999) score = 999;

        return score - 116;
    };

    return this;

})();