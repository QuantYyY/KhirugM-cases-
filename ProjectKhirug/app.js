

btt.onclick = function() {
    var val = document.getElementById('str').value; // взятие строки
    var length = val.length; // длина строки
    var vremStr; // временная строка
    var except = "аоуэи";   // гласные для определения об или о
    var exceptShip = "жшчщ" // условия для проверки шипящих
    var MorW = document.getElementById('MorJ').value; // взятие рода для проверки на 2 или 3 склонение
    var exceptZeroEnd = "бвгдзжпфктсшлмнрхцчщ"       // условия для нулевого окончания


    var predposlChar = val.charAt(length-2); // Предпоследняя согласная для проверки на 3 склонение
    var twoLastChar = predposlChar + val.charAt(length-1); // два последних символа (исключения)
    
    var lastChar = val.charAt(length-1);        // Последний символ
    var firstChar = val[0];                     // Первый символ
    


    if (length == 0){
        document.getElementById('out').innerHTML="Введена пустая строка!";
    }
    if (length != 0){
        document.getElementById('out').innerHTML="Введённое слово: "+val;

        // НАЧАЛО ПРОВЕРОК НА ПРИНАДЛЕЖНОСТЬ 
            switch(lastChar){
                case 'а':                                       // Женский род 1 склонение с буквой А
                       vremStr = val.slice(0, -1);                              
                       if(provFirstChar()){                     // проверка на О ИЛИ ОБ  

                            writer("ы","е","у","ой","е");
                        } else {
                            writer2("ы","е","у","ой","е");
                       }
                break;

                case 'я': // Мужской род 1 склонение с буквой Я
                vremStr = val.slice(0, -1);
                        if(provFirstChar()){

                            writer("и","е","ю","ей","е");
                    
                        } else {

                            writer2("и","е","ю","ей","е");
                            
                        }
                break;

                case 'е': // Средний род 2 склонение с буквой Е
                vremStr = val.slice(0, -1);
                        if(provFirstChar()){

                            writer("я","ю","е","ем","е");
                   
                        } else {

                            writer2("я","ю","е","ем","е");
                            
                        }
                        
                break;

                case 'о': // Средний род 2 склонение с буквой О
                vremStr = val.slice(0, -1);
                        if(provFirstChar()){

                            writer("а","у","о","ом","е");
                   
                        } else {

                            writer2("а","у","о","ом","е");
                            
                        }
                break;

                case 'ь': // 3 склонение женский род с буквой Ь  ИЛИ 2 склонение мужского рода с Ь
                vremStr = val.slice(0, -1);
                        if(provFirstChar() && provShipSogl() && provRodaSlova()){            // Женский род + 3 склонение с окончанием на Ь(в предложном падеже ОБ) 

                            writer("и","и","ь","ью","и");
                    
                        } else if(provShipSogl() && provRodaSlova()){                        // Женский род + 3 склонение с окончанием на Ь (в предложном О) 

                            writer2("и","и","ь","ью","и");

                                } else if(provFirstChar() && provRodaSlova()){               // Женский род + 3 склонение с окончанием на Ь без предпоследней шипящей согласной(в предложном ОБ)

                                    writer("и","и","ь","ью","и");

                                        } else if(provRodaSlova()){                          // Женский род + 3 склонение с окончанием на Ь без предпоследней шипящей согласной(в предложном О)

                                            writer2("и","и","ь","ью","и");
                                             

                                            } else if(provFirstChar() && provRodaSlovaMj()){         // Мужской род + 2 склонение с окончанием на Ь без(в предложном ОБ)

                                                writer("я","ю","я","ём","е");
                                                

                                                } else if(provRodaSlovaMj()){                        // Мужской род + 2 склонение с окончанием на Ь без(в предложном О)

                                                    writer2("я","ю","я","ём","е");
                                                    
                                                    } 
                break;
            } 


            // РЕАЛИЗАЦИЯ ИСКЛЮЧЕНИЙ

            // нулевое окончание мужского рода 2 склонение

            if (provFirstChar() && provZeroEnd()){                          // Мужской род + 2 склонение без окончания(предложный падеж с ОБ) 

                writerZeroEnd("а","у","а","ом","е"); 
                
            } else if ( provZeroEnd() ) {                                    // Мужской род + 2 склонение без окончания(предложный падеж с О) 

                writerZeroEnd2("а","у","а","ом","е");

            }


                
            // исключение окончания -ия -ья 
                
            switch(twoLastChar){
                
                case 'ия':                   // -ия 
                vremStr = val.slice(0, -1);
                    if(provFirstChar){
                        writer("и","е","ю","ей","е"); 
                    } else {
                        writer2("и","е","ю","ей","е");
                    }
                break;

                case 'ий':                   //  -ий
                vremStr = val.slice(0, -1);
                    if(provFirstChar){
                        writer("я","ю","я","ем","е");
                    } else {
                        writer2("я","ю","я","ем","е");
                    }
                break;
            }


            

           
        
    }


    


    // ФУНКЦИЯ НАПИСАНИЯ ВСЕХ ПАДЕЖЕЙ

    // ДЛЯ ИСКЛЮЧЕНИЙ 
    function writerZeroEnd(x,y,z,a,b){                      
        document.getElementById('1').innerHTML="Именительный падеж: "+val;
        document.getElementById('2').innerHTML="Родительный падеж: "+val+x;
        document.getElementById('3').innerHTML="Дательный падеж: "+val+y;
        document.getElementById('4').innerHTML="Винительный падеж: "+val+z;
        document.getElementById('5').innerHTML="Творительный падеж: "+val+a;
        document.getElementById('6').innerHTML="Предложный падеж: об "+val+b; 
    }

    function writerZeroEnd2(x,y,z,a,b){
        document.getElementById('1').innerHTML="Именительный падеж: "+val;
        document.getElementById('2').innerHTML="Родительный падеж: "+val+x;
        document.getElementById('3').innerHTML="Дательный падеж: "+val+y;
        document.getElementById('4').innerHTML="Винительный падеж: "+val+z;
        document.getElementById('5').innerHTML="Творительный падеж: "+val+a;
        document.getElementById('6').innerHTML="Предложный падеж: о "+val+b; 
    }
     
    // ДЛЯ ОБЫЧНЫХ

    function writer(x,y,z,a,b){
        // vremStr = val.slice(0, -1);             // удаление не нужного символа
        document.getElementById('1').innerHTML="Именительный падеж: "+val;
        document.getElementById('2').innerHTML="Родительный падеж: "+vremStr+x;
        document.getElementById('3').innerHTML="Дательный падеж: "+vremStr+y;
        document.getElementById('4').innerHTML="Винительный падеж: "+vremStr+z;
        document.getElementById('5').innerHTML="Творительный падеж: "+vremStr+a;
        document.getElementById('6').innerHTML="Предложный падеж: об "+vremStr+b;
    }
    
    function writer2(x,y,z,a,b){
        // vremStr = val.slice(0, -1);             // удаление не нужного символа
        document.getElementById('1').innerHTML="Именительный падеж: "+val;
        document.getElementById('2').innerHTML="Родительный падеж: "+vremStr+x;
        document.getElementById('3').innerHTML="Дательный падеж: "+vremStr+y;
        document.getElementById('4').innerHTML="Винительный падеж: "+vremStr+z;
        document.getElementById('5').innerHTML="Творительный падеж: "+vremStr+a;
        document.getElementById('6').innerHTML="Предложный падеж: о "+vremStr+b;
    }






    // ФУНКЦИИ РЕАЛИЗУЮЩИЕ ПРОВЕРКИ

    function provFirstChar(){            // функция для проверки в предложном падеже О ИЛИ ОБ
        if (except.indexOf(firstChar) < 0){
            var result = false;
            return result;
        } else {
            var result = true;
            return result;
        }
    }

    function provShipSogl(){            // функция для проверки на шипящие согласные
        if (exceptShip.indexOf(predposlChar) < 0){
            var resultShip = false;
            return resultShip;
        } else {
            var resultShip = true;
            return resultShip;
        }
    }

    function provRodaSlova(){           // для проверки на женский род
        if (MorW == "Женский род"){
            var resultRod = true;
            return resultRod;
        } else if (MorW == "Мужской род"){
            var resultRod = false;
            return resultRod;
        }
    }

    function provRodaSlovaMj(){         // для проверки на мужской род
        if (MorW == "Мужской род"){
            var resultRod = true;
            return resultRod;
        } else if (MorW == "Женский род"){
            var resultRod = false;
            return resultRod;
        }
    }

    function provZeroEnd(){              // проверка нулевого окончания
        if(exceptZeroEnd.indexOf(lastChar) < 0 ){
            var resultZeroEnd = false;
            return resultZeroEnd;
        } else {
            var resultZeroEnd = true;
            return resultZeroEnd;
        }
    }



};

