var file = null;
var orgimg = null;
function showimg(img){
  var can = document.getElementById("can");
  img.drawTo(can);
}
function getOrgImg(){
  file = document.getElementById("finput");
  var img = new SimpleImage(file);
  return img;
}
function setImg(){
  file = document.getElementById("finput");
  doOrg();
}
function doOrg(){
  clearcan();
  orgimg= getOrgImg();
  showimg(orgimg);
}
function doGreyscale(){
  if(orgimg != null && orgimg.complete()){
    var goutput=new SimpleImage(orgimg.width,orgimg.height);
    clearcan();
    for(var pixel of orgimg.values()){
      var avg= (pixel.getRed()+pixel.getBlue()+pixel.getGreen())/3;
      var x= pixel.getX(),y=pixel.getY();
      var newpx = pixel;
      newpx.setRed(avg);
      newpx.setBlue(avg);
      newpx.setGreen(avg);
      goutput.setPixel(x,y,newpx);
    }
    orgimg = getOrgImg();
    showimg(goutput);
  }else{
    alert("Image not loaded");
  }
}
function doRed(){
   if(orgimg != null && orgimg.complete()){
     clearcan();
     var routput = new SimpleImage(orgimg.width,orgimg.height);
     for(var pixel of orgimg.values()){
       var x= pixel.getX(),y=pixel.getY();
      var newpx = pixel ;
      newpx.setRed(255);
       routput.setPixel(x,y,newpx);
     }
     showimg(routput);
   }
}

function doInvert(){
   if(orgimg != null && orgimg.complete()){
     clearcan();
     var ioutput = new SimpleImage(orgimg.width,orgimg.height);
     for(var pixel of orgimg.values()){
       var x= pixel.getX(),y=pixel.getY();
      var newpx = pixel ;
      newpx.setRed(255-newpx.getRed());
       newpx.setBlue(255-newpx.getBlue());
       newpx.setGreen(255-newpx.getGreen());
       ioutput.setPixel(x,y,newpx);
     }
     orgimg=getOrgImg();
     showimg(ioutput);
   }
}
function copy(img){
  var newimg = new SimpleImage(img.width,img.height);
  
  for(var pix of newimg.values()){
    var x=pix.getX(),y=pix.getY();
  pix.setBlue(img.getPixel(x,y).getBlue());
    pix.setRed(img.getPixel(x,y).getRed());  pix.setGreen(img.getPixel(x,y).getGreen());
  }
  return newimg;
}

function do4Seasons(){
   if(orgimg != null && orgimg.complete()){
     clearcan();
     var w=orgimg.width,h=orgimg.height;
     var fsoutput = new SimpleImage(2*w,2*h);
     //season 1
     s1img= copy(orgimg);
     for(var pixel of s1img.values()){
      var x= pixel.getX(),y=pixel.getY();
      pixel.setBlue(200);
       pixel.setRed(255-pixel.getRed());
      fsoutput.setPixel(x,y,pixel);
     }
     //season 2
     s2img= copy(orgimg);
     for(var pixel of s2img.values()){
      var x= pixel.getX(),y=pixel.getY();
       pixel.setBlue(200);
       pixel.setGreen(255-pixel.getGreen());
      fsoutput.setPixel(x+w,y,pixel);
     }
     
     //season 3
     s3img= copy(orgimg);
     for(var pixel of s3img.values()){
       var x= pixel.getX(),y=pixel.getY();
       pixel.setGreen(200);
       pixel.setBlue(255-pixel.getBlue());
    fsoutput.setPixel(x,y+h,pixel);
     }
     // season 4
     s4img= copy(orgimg);
     for(var pixel of s4img.values()){
      var x= pixel.getX(),y=pixel.getY();
      pixel.setRed(200);
       pixel.setGreen(255-pixel.getGreen());
fsoutput.setPixel(x+w,y+h,pixel);
     }
     orgimg= getOrgImg();
     showimg(fsoutput);
   }
}
function doRainbow(){
  if(orgimg != null && orgimg.complete()){
     clearcan();
  var rboutput = copy(orgimg);
    for(var pixel of rboutput.values()){
      var avg = (pixel.getRed()+ pixel.getBlue() + pixel.getGreen())/3;
      var sevheight = orgimg.height/7;
      if(pixel.y<sevheight){
      if(avg<128){
        pixel.setRed(2*avg);
        pixel.setGreen(0);
        pixel.setBlue(0);
      }else{
        pixel.setRed(255);
        pixel.setGreen(2*avg-255);
        pixel.setBlue(2*avg-255);
      }
      }
      else if(pixel.y<2*sevheight){
      if(avg<128){
        pixel.setRed(2*avg);
        pixel.setGreen(0.8*avg);
        pixel.setBlue(0);
      }else{
        pixel.setRed(255);
        pixel.setGreen(1.2*avg-51);
        pixel.setBlue(2*avg-255);
      }
      }
      else if(pixel.y<3*sevheight){
      if(avg<128){
        pixel.setRed(2*avg);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
      }else{
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(2*avg-255);
      }
      }
      else if(pixel.y<4*sevheight){
      if(avg<128){
        pixel.setRed(0);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
      }else{
        pixel.setRed(2*avg-255);
        pixel.setGreen(255);
        pixel.setBlue(2*avg-255);
      }
      }
      else if(pixel.y<5*sevheight){
      if(avg<128){
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
      }else{
        pixel.setRed(2*avg-255);
        pixel.setGreen(2*avg-255);
        pixel.setBlue(255);
      }
      }
      else if(pixel.y<6*sevheight){
      if(avg<128){
        pixel.setRed(0.8*avg);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
      }else{
        pixel.setRed(1.2*avg-51);
        pixel.setGreen(2*avg-255);
        pixel.setBlue(255);
      }
      }
      else if(pixel.y<7*sevheight){
      if(avg<128){
        pixel.setRed(1.6*avg);
        pixel.setGreen(0);
        pixel.setBlue(1.6*avg);
      }else{
        pixel.setRed(0.4*avg+153);
        pixel.setGreen(2*avg-255);
        pixel.setBlue(0.4*avg+153);
      }
      }
    }
    showimg(rboutput);
  } 
}
function doBlur(){
  
}
function clearcan(){
  var can=document.getElementById("can");
  var ctx=can.getContext("2d");
  ctx.clearRect(0,0,can.width,can.height);
}
function resetimg(){
  if(orgimg != null && orgimg.complete()){
     clearcan();
     doOrg();
  }
}