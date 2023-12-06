higiKioskControllers.directive('telemedicineQuestionnaireModal', ['$rootScope','HigiKioskUserService', 'HigiKioskUtilitiesService', 'HigiKioskStorageService', 'HigiApiService', '$timeout', 'JkioskService', function( $rootScope, HigiKioskUserService, HigiKioskUtilitiesService, HigiKioskStorageService, HigiApiService, $timeout, JkioskService) {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/telemedi/gem3s/telemedicine-questionnaire.html',
        controller :function($scope){
           
            $scope.telemedicineQuestionnaire = new Object();

            $scope.textclass = '';
            $scope.slidebtn = '';
            $scope.slidenextbtn = '';

            $scope.telemedicineQuestionnaire.init = function() {
                $scope.telemedi = new Object();
                    
                $scope.telemedi.queSlide = {};

                $scope.telemedi.slides = []; 

                $scope.currentPage = 0;
                $scope.pageSize = 1;

                if($rootScope.questionnaireEnable && $rootScope.preCallQuestion != undefined){
                    $("#teleMedLoad").hide();
                }

                console.log($rootScope.preCallQuestion);
                if($rootScope.preCallQuestion != undefined) {
                    console.log($rootScope.preCallQuestion);

                    $scope.preCallQuestion = $rootScope.preCallQuestion;
                    var msg = $scope.preCallQuestion.msg.split(":");

                    //alert($scope.preCallQuestion.data.questionType.length);
                    console.log($scope.preCallQuestion.data.questionType[0].questions[0].input_type);

                    $scope.questionpreviousbuttonclass = 'tele_previousbuttonclass';
                    $scope.questionnextbuttonclass = 'tele_activennextbuttonclass';

                    if($scope.preCallQuestion.data.questionType[0].questions[0].input_type == 'textbox') {
                        $scope.textclass = 'tele_textbutton';
                        setTimeout(function(){
                            $rootScope.keyboardShow();
                        },100);
                    } else if($scope.preCallQuestion.data.questionType[0].questions[0].input_type == 'radio') {
                     $scope.textclass = 'tele_radiobutton';
                     $rootScope.keyboardHide();
                    } else if($scope.preCallQuestion.data.questionType[0].questions[0].input_type == 'checkbox') {
                     $scope.textclass = 'tele_checkbutton';
                     $rootScope.keyboardHide();
                    } else if($scope.preCallQuestion.data.questionType[0].questions[0].input_type == 'textarea') {
                     $scope.textclass = 'tele_textareabutton';   
                     setTimeout(function(){
                        $rootScope.keyboardShow();
                        },100);
                    } else if($scope.preCallQuestion.data.questionType[0].questions[0].input_type == 'date') {
                        $scope.textclass = 'tele_datebutton'; 
                        $rootScope.keyboardHide(); 
                    }

                    if($scope.preCallQuestion.data.questionType.length > 0 ){
                        for(var i = 0; i < $scope.preCallQuestion.data.questionType.length; i++){
                            
                            $scope.telemedi.queSlide[i] = {};

                            // slide one is 
                            $scope.telemedi.queSlide[i].title = $scope.preCallQuestion.data.questionType[i].name;
                            
                            $scope.telemedi.queSlide[i].backBtnAva = false;
                            $scope.telemedi.queSlide[i].nextBtnAva = false;
                            $scope.telemedi.queSlide[i].submitBtnAva = false;
                            $scope.telemedi.queSlide[i].slideShow = false;
                            
                            $scope.telemedi.queSlide[i].slideIndex = i;
                            $scope.telemedi.queSlide[i].slideLength = $scope.preCallQuestion.data.questionType.length;

                            if(i == 0){
                                // back button hide
                                // first slide show
                                $scope.telemedi.queSlide[i].slideShow = true;

                                if(i == $scope.preCallQuestion.data.questionType.length -1 ){                                    
                                    console.log("back button hide and first slide show and submit button");
                                    $scope.telemedi.queSlide[i].backBtnAva = false;
                                    $scope.telemedi.queSlide[i].nextBtnAva = false;
                                    $scope.telemedi.queSlide[i].submitBtnAva = true;

                                    $scope.nextbuttonclass = '';
                                    $scope.sbmtbuttonclass = '';
                                } else {                                    
                                    console.log("back button hide and first slide show and next button show");
                                    $scope.telemedi.queSlide[i].backBtnAva = false;
                                    $scope.telemedi.queSlide[i].nextBtnAva = true;
                                    $scope.telemedi.queSlide[i].submitBtnAva = false;

                                    $scope.nextbuttonclass = '';
                                    $scope.sbmtbuttonclass = '';
                                }
                            } else if(i == $scope.preCallQuestion.data.questionType.length -1 ){                                
                                // show submit button and back button
                                // slide hide
                                console.log("show submit button and back button show and slide hide");
                                $scope.telemedi.queSlide[i].backBtnAva = true;
                                $scope.telemedi.queSlide[i].nextBtnAva = false;
                                $scope.telemedi.queSlide[i].submitBtnAva = true;
                                $scope.telemedi.queSlide[i].slideShow = false;

                                $scope.nextbuttonclass = '';
                                $scope.sbmtbuttonclass = '';
                            } else {
                                // show back button and next button
                                // slide hide
                                console.log("show back button and next button and slide hide");
                                $scope.telemedi.queSlide[i].backBtnAva = true;
                                $scope.telemedi.queSlide[i].nextBtnAva = true;
                                $scope.telemedi.queSlide[i].submitBtnAva = false;
                                $scope.telemedi.queSlide[i].slideShow = false;

                                $scope.nextbuttonclass = '';
                                $scope.sbmtbuttonclass = '';
                            }          
                            $scope.telemedi.queSlide[i].questions = [];
                            var questionIndex = 0;
                            for(var j = 0; j < $scope.preCallQuestion.data.questionType[i].questions.length; j++) {
                                $scope.telemedi.queSlide[i].questions[questionIndex] = {};

                               /*if($scope.preCallQuestion.data.questionType[i].questions.length == 0){
                                $scope.questionnextbuttonclass = 'tele_nextbuttonclass';
                               }*/

                               console.log($scope.preCallQuestion.data.questionType[i].questions);
                                

                                    $scope.telemedi.queSlide[i].questions[questionIndex].quIndex = questionIndex;
                                
                                if($scope.preCallQuestion.data.questionType[i].questions[j].input_type == "textbox"){
                                    //higi text fileld directive object create
                                    var question = $scope.preCallQuestion.data.questionType[i].questions[j];
                                    $scope.telemedi.queSlide[i].questions[questionIndex] = {"id":question.id, "name":question.name, "defaultText": question.placeholder, "text":"", "input_type": question.input_type, visible : true, selectedClass : '', "is_required": question.is_required,"answer":question.answer,focus : function(){$rootScope.focusField(this) }, "quIndex": questionIndex, "quShow": false, "quNxtClass":"tele_textslidenxtbutton",  "quBackClass":"tele_textslidebutton"};
                                   // console.log(checkboxes);
                                
                                } else if($scope.preCallQuestion.data.questionType[i].questions[j].input_type == "radio"){
                                    //higi radio fileld directive object create
                                    var question = $scope.preCallQuestion.data.questionType[i].questions[j];
                                    $scope.telemedi.queSlide[i].questions[questionIndex] = {"id":question.id, "name":question.name, "hos_spec_id": question.hos_spec_id, "label": question.label, "default_value": checkboxes, "input_type": question.input_type, visible : true, placeholder : question.placeholder, "is_required": question.is_required, "answer":question.answer, "quIndex": questionIndex, "quShow": false, "quNxtClass":"tele_radioslidenxtbutton",  "quBackClass":"tele_radioslidebutton"};
                                
                                } else if($scope.preCallQuestion.data.questionType[i].questions[j].input_type == "checkbox"){
                                    //higi check box fileld directive object create                                    
                                    var checkboxes = $scope.preCallQuestion.data.questionType[i].questions[j].default_value.split(",");
                                    console.log(checkboxes);
                                    var question = $scope.preCallQuestion.data.questionType[i].questions[j];
                                    $scope.telemedi.queSlide[i].questions[questionIndex] = {"id":question.id, "name":question.name, "hos_spec_id": question.hos_spec_id, "label": question.label, "default_value": checkboxes, "input_type": question.input_type, visible : true, placeholder : question.placeholder, "is_required": question.is_required, "answer":[] , "quIndex": questionIndex, "quShow": false, "quNxtClass":"tele_checkslidenxtbutton",  "quBackClass":"tele_checkslidebutton"};
                                
                                } else if($scope.preCallQuestion.data.questionType[i].questions[j].input_type == "textarea"){
                                    var question = $scope.preCallQuestion.data.questionType[i].questions[j];
                                    $scope.telemedi.queSlide[i].questions[questionIndex] = {"id":question.id, "name":question.name, "hos_spec_id": question.hos_spec_id, "label": question.label, "default_value": checkboxes, "input_type": question.input_type, visible : true, placeholder : question.placeholder, "is_required": question.is_required, "answer":question.answer,  focus : function(){$rootScope.focusField(this)}, "quIndex": questionIndex, "quShow": false, "quNxtClass":"tele_textareaslidenxtbutton",  "quBackClass":"tele_textareaslidebutton","quTextAreaClass":"tele_textarearightclass","quTextArealeftClass":"tele_textarealeftclass"};

                                } else if($scope.preCallQuestion.data.questionType[i].questions[j].input_type == "date"){
                                    var question = $scope.preCallQuestion.data.questionType[i].questions[j];
                                    $scope.telemedi.queSlide[i].questions[questionIndex] = {"id":question.id, "name":question.name, "defaultText": question.placeholder, "text":"", "input_type": question.input_type, visible : true, selectedClass : '', "is_required": question.is_required,"answer":question.answer,focus : function(){$rootScope.focusField(this) } ,"quIndex": questionIndex, "quShow": false, "quNxtClass":"tele_dateslidenxtbutton",  "quBackClass":"tele_dateslidebutton"};

                                } else if($scope.preCallQuestion.data.questionType[i].questions[j].input_type == "file"){
                                    var question = $scope.preCallQuestion.data.questionType[i].questions[j];
                                    $scope.telemedi.queSlide[i].questions[questionIndex] = {"id":question.id, "name":question.name, "hos_spec_id": question.hos_spec_id, "label": question.label, "default_value": checkboxes, "input_type": question.input_type, visible : true, placeholder : question.placeholder, "is_required": question.is_required, "answer":question.answer, "quIndex": questionIndex, "quShow": false, "quNxtClass":"inputFieldClass",  "quBackClass":"inputFieldClass"};

                                } else {
                                    console.log("not avaliable this type of input field = "+ $scope.preCallQuestion.data.questionType[i].questions[j].input_type);
                                }

                                questionIndex++;                                
                            }  

                            $scope.telemedi.queSlide[i].questions[0].quShow = true; 
                           // $scope.telemedi.queSlide[i].questions[i].quNxtClass = true;
                            //$scope.telemedi.queSlide[i].questions[i].quBackClass = true;
                        }
                           

                           //FORLOOP For slider buttons and next,submit buttons
                        for(var i = 0; i < $scope.preCallQuestion.data.questionType.length; i++){
                          for(var j = 0; j < $scope.preCallQuestion.data.questionType[i].questions.length; j++){
                    
                             if($scope.preCallQuestion.data.questionType[i].questions.length == 1){
                                $rootScope.slideQuestionLength = $scope.preCallQuestion.data.questionType[i].questions.length;
                                //alert($rootScope.slideQuestionLength);
                                $scope.nextbuttonclass = 'active_btn';
                                $scope.sbmtbuttonclass = 'active_btn';
                                $scope.questionpreviousbuttonclass = 'tele_previousbuttonclass';
                                $scope.questionnextbuttonclass = 'tele_nextbuttonclass';
                               
                             }
                             
                         }        
                        }

                    } else {
                        //alert("No data is avaliable")
                    }

                    $scope.telemedi.questionSlides = $scope.telemedi.queSlide;   
                    $rootScope.telemediSlideQue =  $scope.telemedi.queSlide;
                    console.log($scope.telemedi); 
                } else {

                    console.log($rootScope.preCallQuestion);
                }    


                
                if(!$rootScope.questionnaireEnable && $rootScope.preCallQuestion != undefined) {
                    setTimeout(function(){
                        $rootScope.keyboardHide();
                        //$("#teleMedLoad").hide();
                        var size = Object.keys($scope.telemedi.questionSlides).length;
                        console.log($scope.telemedi.questionSlides[size-1]);
                        $scope.answersubmission($scope.telemedi.questionSlides[size-1]);
                    },100);
                }            
            };

            $scope.nxtbutton = "global.nxtbutton";
            $scope.sbmtbutton = "global.sbmtbutton";
            $scope.telemediquesback = "global.telemediquesback"; 

            

            $scope.telemedicineQuestionnaire.init();
            $rootScope.telemedicineQuestions = $scope.telemedicineQuestionnaire.init;
   

            $scope.telemediSlideNxtBtn = function(slide) {
               console.log(slide);
                //$scope.currentPage = 0;
                for (var i = 0; i < $scope.telemedi.queSlide[slide.slideIndex].questions.length; i++) {
                $scope.lastanswer = $scope.telemedi.queSlide[slide.slideIndex].questions[i].answer;
                $scope.lastrequired = $scope.telemedi.queSlide[slide.slideIndex].questions[i].is_required;
               }
                if(($scope.lastanswer == "" && $scope.lastrequired == "yes") || ($scope.lastanswer == [] && $scope.lastrequired == "yes")){
                    $scope.emptyinput = true;
                }else{
                    $scope.emptyinput = false;
                if(slide.slideIndex < slide.slideLength - 1) {
                    //$scope.telemedi.queSlide[slideIndex].questions[questionIndex].quShow
                    
                    $scope.telemedi.queSlide[slide.slideIndex].slideShow = false;
        
                    var nextslide = slide.slideIndex + 1;
                    $scope.telemedi.queSlide[nextslide].slideShow = true; 

                     for (var i = 0; i < $scope.telemedi.queSlide[slide.slideIndex + 1].questions.length; i++) {
                        //alert("INN"+ $scope.telemedi.queSlide[slide.slideIndex + 1].questions.length);
                        if($scope.telemedi.queSlide[slide.slideIndex+1].questions[i].quIndex == 0){  
                          $scope.questionnextbuttonclass = 'tele_activennextbuttonclass';
                          $scope.questionpreviousbuttonclass = 'tele_previousbuttonclass';
                          $scope.nextbuttonclass = '';
                          $scope.sbmtbuttonclass = '';

                          if ($scope.telemedi.queSlide[slide.slideIndex + 1].questions.length == 1) {
                            //alert($scope.telemedi.queSlide[slide.slideIndex + 1].questions.length);
                            $scope.nextbuttonclass = 'active_btn';
                            $scope.sbmtbuttonclass = 'active_btn';
                            $scope.questionpreviousbuttonclass = 'tele_previousbuttonclass';
                            $scope.questionnextbuttonclass = 'tele_nextbuttonclass';
                          }

                          $scope.telemedi.queSlide[slide.slideIndex+1].questions[i].quShow = true;

                        }else if($scope.telemedi.queSlide[slide.slideIndex+1].questions[i].quIndex != 0) {
                            
                            $scope.telemedi.queSlide[slide.slideIndex+1].questions[i].quShow = false;
                            
                        
                        }   


                    }

                    if($scope.telemedi.queSlide[slide.slideIndex+1].questions[0].input_type == "radio"){
                            $scope.textclass = 'tele_radiobutton';
                            $rootScope.keyboardHide();
                            console.log($scope.textclass);
                    }else if($scope.telemedi.queSlide[slide.slideIndex+1].questions[0].input_type == "checkbox"){
                            $scope.textclass = 'tele_checkbutton';
                            $rootScope.keyboardHide();
                            console.log($scope.textclass); 
                    }else if($scope.telemedi.queSlide[slide.slideIndex+1].questions[0].input_type == "textbox"){
                            $scope.textclass = 'tele_textbutton'; 
                            $rootScope.keyboardShow();
                            console.log($scope.textclass);
                    }else if($scope.telemedi.queSlide[slide.slideIndex+1].questions[0].input_type == "textarea"){
                            $scope.textclass = 'tele_textareabutton';
                            $rootScope.keyboardShow(); 
                            console.log($scope.textclass);
                    }else if($scope.telemedi.queSlide[slide.slideIndex+1].questions[0].input_type == "date"){
                            $scope.textclass = 'tele_datebutton'; 
                            console.log($scope.textclass);
                            $rootScope.keyboardHide();
                    }
                   

                } else {
                    console.log("next slide load faild"+ slide.slideIndex);
                }
              }
            }

            $scope.telemediSlideBckBtn = function(slide) {
                console.log(slide);
                //$scope.currentPage = 0;
                if(slide.slideIndex > 0) {
                    $scope.telemedi.queSlide[slide.slideIndex].slideShow = false;

                    var backSlide = slide.slideIndex - 1;
                    $scope.telemedi.queSlide[backSlide].slideShow = true;

                    console.log($scope.telemedi.queSlide[slide.slideIndex - 1].questions.length);



                    for (var i = 0; i < $scope.telemedi.queSlide[slide.slideIndex - 1].questions.length; i++) {
                           //alert("INN"+ $scope.telemedi.queSlide[slide.slideIndex - 1].questions.length);
                        if($scope.telemedi.queSlide[slide.slideIndex-1].questions[i].quIndex == 0){  
                          $scope.questionnextbuttonclass = 'tele_activennextbuttonclass';
                          $scope.questionpreviousbuttonclass = 'tele_previousbuttonclass';
                          $scope.nextbuttonclass = '';
                          $scope.sbmtbuttonclass = '';

                          if ($scope.telemedi.queSlide[slide.slideIndex - 1].questions.length == 1) {
                              //alert($scope.telemedi.queSlide[slide.slideIndex - 1].questions.length);
                            $scope.nextbuttonclass = 'active_btn';
                            $scope.sbmtbuttonclass = 'active_btn';
                            $scope.questionpreviousbuttonclass = 'tele_previousbuttonclass';
                            $scope.questionnextbuttonclass = 'tele_nextbuttonclass';
                          }
                          $scope.telemedi.queSlide[slide.slideIndex-1].questions[i].quShow = true;
                          
                        }else if($scope.telemedi.queSlide[slide.slideIndex-1].questions[i].quIndex != 0) {
                            
                            $scope.telemedi.queSlide[slide.slideIndex-1].questions[i].quShow = false;
                            
                        
                        }  
                    }

                     console.log($scope.telemedi.queSlide[backSlide].questions);

                    if($scope.telemedi.queSlide[backSlide].questions[0].input_type == "radio"){
                            $scope.textclass = 'tele_radiobutton';
                            $rootScope.keyboardHide();
                            console.log($scope.textclass);
                    }else if($scope.telemedi.queSlide[backSlide].questions[0].input_type == "checkbox"){
                            $scope.textclass = 'tele_checkbutton';
                            $rootScope.keyboardHide();
                            console.log($scope.textclass); 
                    }else if($scope.telemedi.queSlide[backSlide].questions[0].input_type == "textbox"){
                            $scope.textclass = 'tele_textbutton'; 
                            $rootScope.keyboardShow();
                            console.log($scope.textclass);
                    }else if($scope.telemedi.queSlide[backSlide].questions[0].input_type == "textarea"){
                            $scope.textclass = 'tele_textareabutton'; 
                            $rootScope.keyboardShow();
                            console.log($scope.textclass);
                    }else if($scope.telemedi.queSlide[backSlide].questions[0].input_type == "date"){
                            $scope.textclass = 'tele_datebutton'; 
                            console.log($scope.textclass);
                            $rootScope.keyboardHide();
                    }    

                    console.log($scope.telemedi.queSlide[backSlide].questions);     

                } else {
                    console.log("back slide load faild"+ slide.slideIndex);
                }
            }

            $scope.QuPrvBtn = function(slideIndex,questionIndex) {                
                if(($scope.telemedi.questionSlides[slideIndex].questions[questionIndex].answer == "" && $scope.telemedi.questionSlides[slideIndex].questions[questionIndex].is_required == "yes") || ($scope.telemedi.questionSlides[slideIndex].questions[questionIndex].answer == [] && $scope.telemedi.questionSlides[slideIndex].questions[questionIndex].is_required == "yes")){
                 $scope.emptyinput = true;
                }else{
                 $scope.emptyinput = false;
                if(questionIndex >  0) {
                    $scope.telemedi.questionSlides[slideIndex].questions[questionIndex].quShow = false;
                    $scope.questionnextbuttonclass = 'tele_activennextbuttonclass';
                    $scope.nextbuttonclass = '';
                    $scope.sbmtbuttonclass = '';
                    if($scope.telemedi.questionSlides[slideIndex].questions[questionIndex-1].quIndex == 0){
                        $scope.questionpreviousbuttonclass = 'tele_previousbuttonclass';
                        $scope.nextbuttonclass = '';
                        $scope.sbmtbuttonclass = '';
                    }
                    $scope.telemedi.questionSlides[slideIndex].questions[questionIndex-1].quShow = true;  

                    console.log($scope.telemedi.questionSlides[slideIndex].questions[questionIndex-1].input_type);
                    if($scope.telemedi.questionSlides[slideIndex].questions[questionIndex-1].input_type == "radio"){
                            $scope.textclass = 'tele_radiobutton';
                            $rootScope.keyboardHide();
                            console.log($scope.textclass);
                    }else if($scope.telemedi.questionSlides[slideIndex].questions[questionIndex-1].input_type == "checkbox"){
                            $scope.textclass = 'tele_checkbutton';
                            $rootScope.keyboardHide();
                            console.log($scope.textclass); 
                    }else if($scope.telemedi.questionSlides[slideIndex].questions[questionIndex-1].input_type == "textbox"){
                            $scope.textclass = 'tele_textbutton';
                            $rootScope.keyboardShow(); 
                            console.log($scope.textclass);
                    }else if($scope.telemedi.questionSlides[slideIndex].questions[questionIndex-1].input_type == "textarea"){
                            $scope.textclass = 'tele_textareabutton'; 
                            $rootScope.keyboardShow();
                            console.log($scope.textclass);
                    }else if($scope.telemedi.questionSlides[slideIndex].questions[questionIndex-1].input_type == "date"){
                            $scope.textclass = 'tele_datebutton'; 
                            $rootScope.keyboardHide();
                            console.log($scope.textclass);
                    }    
                } 
             }
            }

            $scope.QuNxtBtn = function(slideIndex,questionIndex){
                console.log(slideIndex);
                console.log(questionIndex);
                console.log($scope.telemedi.questionSlides[slideIndex].questions.length-2);
                 if(($scope.telemedi.questionSlides[slideIndex].questions[questionIndex].answer == "" && $scope.telemedi.questionSlides[slideIndex].questions[questionIndex].is_required == "yes") || ($scope.telemedi.questionSlides[slideIndex].questions[questionIndex].answer == [] && $scope.telemedi.questionSlides[slideIndex].questions[questionIndex].is_required == "yes")){
                 $scope.emptyinput = true;
                }else{
                 $scope.emptyinput = false;
                if(questionIndex == $scope.telemedi.questionSlides[slideIndex].questions.length-2){
                  $scope.questionnextbuttonclass = 'tele_nextbuttonclass';
                  $scope.nextbuttonclass = 'active_btn';
                  $scope.sbmtbuttonclass = 'active_btn';
                }
                if(questionIndex <  $scope.telemedi.questionSlides[slideIndex].questions.length -1) {
                    $scope.telemedi.questionSlides[slideIndex].questions[questionIndex].quShow = false;
            
                    $scope.questionpreviousbuttonclass = 'tele_activepreviousbuttonclass';
                    $scope.telemedi.questionSlides[slideIndex].questions[questionIndex+1].quShow = true; 
                    console.log($scope.telemedi.questionSlides[slideIndex].questions[questionIndex+1].input_type);
                    if($scope.telemedi.questionSlides[slideIndex].questions[questionIndex+1].input_type == "radio"){
                            $scope.textclass = 'tele_radiobutton';
                            $rootScope.keyboardHide();
                            console.log($scope.textclass);
                    }else if($scope.telemedi.questionSlides[slideIndex].questions[questionIndex+1].input_type == "checkbox"){
                            $scope.textclass = 'tele_checkbutton';
                            $rootScope.keyboardHide();
                            console.log($scope.textclass); 
                    }else if($scope.telemedi.questionSlides[slideIndex].questions[questionIndex+1].input_type == "textbox"){
                            $scope.textclass = 'tele_textbutton'; 
                            $rootScope.keyboardShow();
                            console.log($scope.textclass);
                    }else if($scope.telemedi.questionSlides[slideIndex].questions[questionIndex+1].input_type == "textarea"){
                            $scope.textclass = 'tele_textareabutton'; 
                            $rootScope.keyboardShow();
                            console.log($scope.textclass);
                    }else if($scope.telemedi.questionSlides[slideIndex].questions[questionIndex+1].input_type == "date"){
                            $scope.textclass = 'tele_datebutton'; 
                            $rootScope.keyboardHide();
                            console.log($scope.textclass);
                    }     
                } 
            } 

            }

            $scope.answersubmission = function(slide){

                $("#teleMedLoad").show();

                for (var i = 0; i < $scope.telemedi.queSlide[slide.slideIndex].questions.length; i++) {
                    $scope.submitlastanswer = $scope.telemedi.queSlide[slide.slideIndex].questions[i].answer;
                    $scope.submitlastrequired = $scope.telemedi.queSlide[slide.slideIndex].questions[i].is_required;
                }

                if(($scope.submitlastanswer == "" && $scope.submitlastrequired == "yes") || ($scope.submitlastanswer == [] && $scope.submitlastrequired == "yes")){
                    $scope.emptyinput = true;
                } else {
                    $scope.emptyinput = false;
                    $scope.modalHide();

                    window.location = "#/doctorlist";
                }
            }
        }

    };
}]);

