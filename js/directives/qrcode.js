angular.module('qrCodeModel2', [])
  .directive('qrcode', ['$window', '$rootScope', function($window, $rootScope) {
        return{
            restrict: 'E',
            scope: true,
            template: '<canvas id="{{id}}"></canvas>',
            link :function(scope, element, attr) {
                var ecstrategy = ['L'];
                var version = null;
                var maskPattern = null;
                var maskTest = false;
                var quietZoneSize = 4;
                var modulesize = attr.modulesize || 5;

                scope.id = attr.cid || "canvas";

                function draw(code, blocksize, quietZoneSize) {
                    blocksize = blocksize || 4;
                    quietZoneSize = quietZoneSize || 4;
                    var colors = {};
                    colors[code.matrix.DATA_DARK_MODULE] = '#000000';
                    colors[code.matrix.DATA_LIGHT_MODULE] = '#E6E6E6';
                    colors[code.matrix.DATA_UNDEFINED_MODULE] = '#CCCCCC';
                    var quietZone = quietZoneSize * blocksize;
                    var size = code.getSize() * blocksize + 2 * quietZone;
                    var grid = code.getData();
                    var canvas = document.getElementById(scope.id);
                    canvas.setAttribute('width', size);
                    canvas.setAttribute('height', size);
                    var context = canvas.getContext('2d');
                    context.beginPath();
                    context.fillStyle = colors[code.matrix.DATA_LIGHT_MODULE];
                    context.rect(0, 0, size, size);
                    context.fill();
                    for (var top = 0; top < grid.length; top++) {
                        for (var left = 0; left < grid[0].length; left++) {
                            if (grid[top][left] !== 0) {
                                context.beginPath();
                                context.fillStyle = colors[grid[top][left]];
                                context.rect(quietZone + left * blocksize, quietZone + top * blocksize, blocksize, blocksize);
                                context.fill();
                            }
                        }
                    }
                }

                function run(data, ecstrategy, maskPattern, version, modulesize, quietZoneSize, dataOnly) {
                    dataOnly = dataOnly || false;
                    try {
                        var qrcode = new QrCode(data, ecstrategy, maskPattern, version, dataOnly, maskTest);
                        draw(qrcode, modulesize, quietZoneSize);
                        var info = qrcode.getInfo();
                        info.charcount = data.length;
                    }
                    catch (e) {
                       console.log(e.toString());
                    }
                }
                scope.codeWatch = $rootScope.$watch('qrData', function(newVal){
                    run(newVal, ecstrategy, maskPattern, version, modulesize, quietZoneSize, false);
                });
            }

        };
  }]);
