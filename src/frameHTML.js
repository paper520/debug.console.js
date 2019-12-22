export default `
<!DOCTYPE html>
<html>
<head>
  <style>
    .togger-btn{
      position: fixed;
      cursor: pointer;
      top: 5px;
      right: 5px;
      z-index: 9999;
      background-color: #ff1e8a;
      margin: 0px;
      width: 35px;
      height: 35px;
      border: 2px dashed #ffffff;
      border-radius: 50%;
      line-height: 35px;
      text-align: center;
      font-size: 14px;
      color: white;
    }
    .show-list{
      display:none;
      padding:10px
    }
    .show-list li:not(:first-child){
      border-top:1px solid white;
    }
    .show-list li{
      padding:7px 0;
    }
  </style>
  <script>
    var isHidden=true;
    function togger(){
      var iframe=window.parent.document.getElementById('debug-console-js');
      if(isHidden){
        document.getElementById('showlist').style.display='block';
        iframe.style.width='100vw';
        iframe.style.height='100vh';
        iframe.style.backgroundColor='#e4e1e1';
      }else{
        document.getElementById('showlist').style.display='none';
        iframe.style.width='50px';
        iframe.style.height='50px';
        iframe.style.backgroundColor='';
      }
      isHidden=!isHidden;
    }
  </script>
</head>
<body style='margin:0;'>
  <ul id='showlist' class='show-list'>
  </ul>
  <div class='togger-btn' onclick='togger()'>调试</div>
</body>
</html>
`;