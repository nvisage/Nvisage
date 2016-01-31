import React from 'react';
import {Router} from 'react-router';
import {connect} from 'react-redux';

import CardComponent from '../card/card.jsx';

import _ from 'lodash';
import _chance from 'chance';
chance = new _chance();
import $ from 'jquery';
import 'jquery-ui/draggable';
import 'jquery-ui/resizable';

import './board.css';


class BoardComponent extends React.Component{
  dispatchNewCard(){
    let title = document.getElementById('input-title');
    let author = document.getElementById('input-author');
    let text = document.getElementById('input-text');
    this.props.dispatch(Actions.newCard(title.value, author.value, text.value, window.imageData));
    title.value = '';
    author.value = '';
    text.value = '';
  }

  dispatchViewCard(reference){

  }

  componentDidMount(){
    // $('.dragandresize').draggable().resizable();
    let canvas = document.getElementById('canvas');
    // if (typeof G_vmlCanvasManager != 'undefined') {
    //   canvas = G_vmlCanvasManager.initElement(canvas);
    // }
    let context = canvas.getContext("2d");

    //drawing functions
    var paint = false;
    var isDrawMode = true;
    var isErasing = false;

    $('#canvas').mousedown(function(e) {
      var mouseX = e.pageX - $('#canvas').offset().left;
      var mouseY = e.pageY;
      console.log(e.pageX, e.pageY);
      if (isDrawMode) {
        paint = true;
        addClick(e.pageX - $('#canvas').offset().left, e.pageY - $('#canvas').offset().top);
        redraw();
      }
      if (!isDrawMode) {
        var locationContainer = $("<div></div>");
        locationContainer.addClass("Contain");
        locationContainer.css("left", mouseX);
        locationContainer.css("top", mouseY);
        var motionContainer = $("<div></div>");
        motionContainer.addClass("MoveBox");
        var textBox = $("<textarea>Enter Text</textarea>");
        textBox.addClass("TextBox")
        motionContainer.append(textBox);
        motionContainer.draggable().resizable();
        locationContainer.append(motionContainer);
        $("#canvasDiv").append(locationContainer);

        //turns back to drawing
        changeMode();
      }
    });

    $("#colorPicker").hide();

    $('#canvas').mousemove(function(e) {
      if (isDrawMode) {
        if (paint) {
          addClick(e.pageX - $('#canvas').offset().left, e.pageY - $('#canvas').offset().top, true);
          redraw();
        }
      }
    });

    $('#canvas').mouseup(function(e) {
      if (isDrawMode) {
        paint = false;
      }
    });

    $('#canvas').mouseleave(function(e) {
      if (isDrawMode) {
        paint = false;
      }
    });

    var clickX = new Array();
    var clickY = new Array();
    var clickDrag = new Array();
    var paint;
    var clickColor = new Array();
    var currColor = "black";

    function addClick(x, y, dragging) {
      /*
      var text = $('#colorPicker').val();
      if (text == "erase" || text == "eraser" || text == "#FFFFFF") {
        text = "white";
      }*/
      clickX.push(x);
      clickY.push(y);
      clickDrag.push(dragging);

      clickColor.push(currColor);
    }

    $("#black").click(function() {
      currColor = ("black");
    });

    $("#blue").click(function() {
      currColor = ("blue");
    });

    $("#red").click(function() {
      currColor = ("red");
    });

    $("#green").click(function() {
      currColor = ("green");
    });
    $("#purple").click(function() {
      currColor = ("purple");
    });
    $("#white").click(function() {
      currColor = ("white");
    });


    function redraw() {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

      context.lineJoin = "round";
      //context.lineWidth = 5;

      for (var i = 0; i < clickX.length; i++) {
        context.beginPath();
        if (clickDrag[i] && i) {
          context.moveTo(clickX[i - 1], clickY[i - 1]);
        } else {
          context.moveTo(clickX[i] - 1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        var currColor = clickColor[i];
        if (currColor == "white") {
          context.lineWidth = 20;
          currColor = "white";
        } else {
          context.lineWidth = 2;
        }
        context.strokeStyle = currColor;
        context.stroke();
      }
    }

    //Code for clear button by Kalvin
    $("#clearButton").click(function() {
      var yes = confirm("Clear Screen?");
      if (yes) {
        clickX = [];
        clickY = [];
        clickDrag = [];
        clickColor = [];
        redraw(); // Clears the canvas
        $(".TextBox").remove();
        $(".MoveBox").remove();
        $(".Contain").remove();
      }

    });

    //save button
    $('#saveButton').click(function() {
      html2canvas(canvasDiv, {
        onrendered: function(canvas) {
          window.imageData = canvas.toDataURL('image/png', 1.0);

          // document.getElementById('canvasImg').src = imageData;
        }
      });
    });


    //switches between draw and text
    function changeMode() {
      isDrawMode = !isDrawMode;
      if (isDrawMode) {
        $('#switchButton').text("Add Text");
        $('#canvas').css('cursor', 'crosshair');
      } else {
        $('#switchButton').text("Click Board");
        $('#canvas').css('cursor', 'pointer');
      }
    }

    $('#switchButton').click(changeMode);

    //Change color when hover over buttons (kalvin)
    // $(".Button").hover(function() {
    //     $(this).css("background-color", "blue");
    //   },
    //   function() {
    //     $(this).css("background-color", "black");
    //   }
    // );

    $('body').dblclick(function(e) {
      var target = $(e.target);
      if (target.is('.MoveBox')) {
        target.remove();
      }
    })

    //color palette kalvin
    // $("#colors").hide();
    //
    // $("#black").mouseover(function(){
    //
    //   $("#colors").slideDown("slow");
    //
    // });
  }

  render(){
    let k = [];
    let j = 0;
    for(let card of this.props.cards){
      k.push(<CardComponent key={j} reference={card.reference} title={card.title} date={card.date} author={card.author} text={card.text} image={card.image} className='dragandresize'/>);
      j++;
    }
    return <div className='board'>
      <div className='board-main'>
        {k}
      </div>
      <div className='newboard'>
        <input id='input-title' placeholder='title'/>
        <input id='input-author'placeholder='author'/><br/>
        <textarea id='input-text' placeholder='description'></textarea><br/>
        <button type="button" className="btn btn-primary" onClick={this.dispatchNewCard.bind(this)}>Submit</button>
        <div>
          <div id="canvasDiv"><canvas width='400' height='400' id='canvas'></canvas></div>
          <div id="switchButton" className="Button btn">Add Text</div>
          <div id="saveButton" className="Button btn">Save</div>
          <div id="clearButton" className="Button btn">Clear</div>

          <span id="colors">
            <img id ="black" src = "assets/img/black-rect.png"/>
            <img id="blue" src = "assets/img/blue-rect.png"/>
            <img id="red" src = "assets/img/red-rect.png"/>
            <img id="purple" src = "assets/img/violet-rect.png"/>
            <img id="green" src = "assets/img/green-rect.png"/>
            <img id = "white" src = "assets/img/white-rect.png"/>
          </span>
        </div>
      </div>
    </div>;
  }
}

const CardModel = (reference, title, date, author, text, image)=>{
  return {
    reference, title, date, author, text, image
  };
}

const Actions = {
  newCard: (title, author, text, image)=>{
    return {
      type: 'NEW_CARD',
      cardData: {reference: chance.guid(), title, date: new Date().toISOString(), author, text, image}
    };
  }
};

const BoardReducer = (state={cards: []}, action)=>{
  switch(action.type){
    case 'NEW_CARD':
      let newCards = [...state.cards, CardModel(action.cardData.reference, action.cardData.title, action.cardData.date, action.cardData.author, action.cardData.text, action.cardData.image)];
      return Object.assign({}, state, {
        cards: newCards
      });
    default:
      return state;
  }
}

export const BoardRedux = {BoardReducer};

const select = (state)=>{
  return state.BoardReducer;
};

export default connect(select)(BoardComponent)
