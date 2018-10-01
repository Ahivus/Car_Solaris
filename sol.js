$(document).ready(function() {
 
    
    
     $('#colorsSelector .colorItem').on('click',function() {
    
    var imgpath;
         imgpath = $(this).attr('data-img-path');
         
       //Переход методом fadeIn  
      // $('#imgHolder img').fadeOut(50,function() {
     // $('#imgHolder img').attr('src',imgpath).fadeIn(50);
    //} ); 
         
       $('#imgHolder img').attr('src',imgpath);   
     } );
    
    
    var modelSpecs,
        modelPrice,
        modelSpecsHolder,
        modelPriceHolder,
        modelPriceUSDHolder,
        modelPriceEURHolder;
    
    modelSpecsHolder=$('#modelSpecs');
    modelPriceHolder=$('#modelPrice');
    modelPriceUSDHolder=$('#modelPriceUSD');
    modelPriceEURHolder=$('#modelPriceEUR');
    
    modelSpecs=' ';
    modelPrice=0;
    
    function calculatePrice() {
    var modelPriceEngine=$('input[name=engine]:checked','#autoForm').val();
    var modelPriceTransmission=$('input[name=transmission]:checked','#autoForm').val();
    var modelPricePackage=$('input[name=package]:checked','#autoForm').val();
    modelPriceEngine=parseInt(modelPriceEngine);
    modelPriceTransmission=parseInt(modelPriceTransmission);    
    modelPricePackage=parseInt(modelPricePackage);
        
        modelPrice=modelPriceEngine+modelPriceTransmission+modelPricePackage;
        modelPriceHolder.text (abc2(modelPrice)+'рублей');
         
    };
    
    function compileSpecs() {
     modelSpecs=$('input[name=engine]:checked+label','#autoForm').text();
    modelSpecs=modelSpecs +',' + $('input[name=transmission]:checked+label','#autoForm').text();
    modelSpecs=modelSpecs +' ,' + $('input[name=package]:checked+label','#autoForm').text();
        modelSpecsHolder.text(modelSpecs);
        
    };
      
    //при старте страницы
         calculatePrice();
         compileSpecs();
        // calculateUSD()
    
        //при переключении радиокнопок
       $('#autoForm input').on('change',function() {
         calculatePrice(); 
         compileSpecs();
         calculateUSD();
           calculateEUR();
        }); 
    
    
    
    
    
    function addSpace(nStr) {
        nStr+= '';
        x=nStr.split('.');
        x1=x[0];
        x2=x.length>1?'.'+x[1]:'';
        var rgx=/(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1=x1.replace(rgx,'$1'+''+'$2');
        }
        
        return x1+x2;        
    };
    
  var currencyUrl = 'https://www.cbr-xml-daily.ru/daily.xml';
    var rurUsdRate = 0;
    rurUsdRate =parseFloat(rurUsdRate);
    
    $.ajax({
       url: currencyUrl,
        cashe: false,
        success:function(html) {
            console.log(html.activeElement.childNodes[10].childNodes[4].innerHTML);
           rurUsdRate =html.activeElement.childNodes[10].childNodes[4].innerHTML;
           rurUsdRate = parseInt(rurUsdRate);
            
            //console.log(rurUsdRate);
           // console.log(modelPrice);
           //var modelPriceUSD = modelPrice/rurUsdRate;
           //console.log(modelPriceUSD);
           calculateUSD();
            
            
        }
        
    });
    
    function calculateUSD(){
        
        var modelPriceUSD = modelPrice/rurUsdRate;
        //alert(modelPriceUSD);
       modelPriceUSDHolder.text('$ ' + abc2(modelPriceUSD.toFixed(0)) );
        
        
    };
    
    var currencyUrlEUR = 'https://www.cbr-xml-daily.ru/daily.xml';
    var rurEURRate = 0;
    rurEURRate =parseFloat(rurEURRate);
    
    $.ajax({
       url: currencyUrlEUR,
        cashe: false,
        success:function(html) {
            console.log(html.activeElement.childNodes[11].childNodes[4].innerHTML);
            rurEURRate =html.activeElement.childNodes[11].childNodes[4].innerHTML;
          rurEURRate = parseInt(rurEURRate);
            
            //console.log(rurUsdRate);
           // console.log(modelPrice);
           //var modelPriceUSD = modelPrice/rurUsdRate;
           //console.log(modelPriceUSD);
           calculateEUR();
            
            
        }
        
    });
    
     function calculateEUR(){
        
        var modelPriceEUR = modelPrice/rurEURRate;
        
       modelPriceEURHolder.text('€ ' + abc2(modelPriceEUR.toFixed(0)) );
         //alert(modelPriceEUR);
         
        
        
    };
    
    function abc2(n) {

	    n += "";

	    n = new Array(4 - n.length % 3).join("U") + n;

	    return n.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");

	}

	//alert(abc2("13788656456456456"));
    
    
    
    
    
});
    
    
    
    
    
    
    
    /*$('#colorsSelector .colorItem.colorBlue').on('click',function() {
      $('#imgHolder img').attr('src','img/blue.png');
        
        
    });
    
    $('#colorsSelector .colorItem.colorBlue').on('mouseenter',function() {
      $('#colorsSelector .colorItem.colorBlue').animate({'opacity':'0.5'},1000) ;
        
        
    });
    $('#colorsSelector .colorItem.colorBlue').on('mouseleave',function() {
      $('#colorsSelector .colorItem.colorBlue').animate({'opacity':'1'},1000) ;
        
        
    });
    
    
    
    $('#colorsSelector .colorItem.colorRed').on('click',function() {
      $('#imgHolder img').attr('src','img/red.png');
        
        
    });
    
    $('#colorsSelector .colorItem.colorRed').on('mouseenter',function() {
      $('#colorsSelector .colorItem.colorRed').animate({'opacity':'0.5'},1000) ;
        
        
    });
    $('#colorsSelector .colorItem.colorRed').on('mouseleave',function() {
      $('#colorsSelector .colorItem.colorRed').animate({'opacity':'1'},1000) ;
        
        
    });
    
    
    
    
     $('#colorsSelector .colorItem.colorWhite').on('click',function() {
      $('#imgHolder img').attr('src','img/white.png');  
    });
    
    
     $('#colorsSelector .colorItem.colorBlack').on('click',function() {
      $('#imgHolder img').attr('src','img/black.png'); 
    });
    
     $('#colorsSelector .colorItem.colorBlack').on('mouseenter',function() {
      $('#colorsSelector .colorItem.colorBlack').animate({'opacity':'0.5'},1000) ;
        
        
    });
    $('#colorsSelector .colorItem.colorBlack').on('mouseleave',function() {
      $('#colorsSelector .colorItem.colorBlack').animate({'opacity':'1'},1000) ;
        
        
    });
    
    
    
    
    
    $('#colorsSelector .colorItem.colorGrey').on('click',function() {
      $('#imgHolder img').attr('src','img/grey.png');    
    });
    
    $('#colorsSelector .colorItem.colorGrey').on('mouseenter',function() {
      $('#colorsSelector .colorItem.colorGrey').animate({'opacity':'0.5'},1000) ;
        
        
    });
    $('#colorsSelector .colorItem.colorGrey').on('mouseleave',function() {
      $('#colorsSelector .colorItem.colorGrey').animate({'opacity':'1'},1000) ;
        
        
    });
    
    
    
    
    $('#colorsSelector .colorItem.colorGold').on('click',function() {
      $('#imgHolder img').attr('src','img/gold.png');   
    });
    
     $('#colorsSelector .colorItem.colorGold').on('mouseenter',function() {
      $('#colorsSelector .colorItem.colorGold').animate({'opacity':'0.5'},1000) ;
        
        
    });
    $('#colorsSelector .colorItem.colorGold').on('mouseleave',function() {
      $('#colorsSelector .colorItem.colorGold').animate({'opacity':'1'},1000) ;
        
        
    });
    
    
    
    
    
    
    
    
    
});*/







//var srcValue = $('#imgHolder img').attr('src');
   // alert(srcValue);
    
   // $('#imgHolder img').on('click',function(){
      //  $(this).attr('src','img/blue.png')
        
   // });