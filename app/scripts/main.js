
import jquery from 'jquery';
import "jquery-ui-bundle";
import * as draw2d from 'draw2d';

import {createSvgLinearGradient} from './util/svg/svg-utils'


jquery(window).ready(function () {

    const canvas = new draw2d.Canvas("gfx_holder");
    window.canvas = canvas;
    console.log(canvas.paper);
    canvas.paper.canvas.getElementsByTagName('defs')[0].appendChild(createSvgLinearGradient(
        'grad1',
        [0,0],
        [100,0],
        [{colorString: '#47D4E6', offset: 50}, {colorString: 'rgb(255,0,0)', offset: 50}] 
    ));
    canvas.paper.canvas.getElementsByTagName('defs')[0].appendChild(createSvgLinearGradient(
        'grad2',
        [0,0],
        [100,0],
        [{colorString: 'rgb(255,0,0)', offset: 50}, {colorString: '#47D4E6', offset: 50}] 
    ));

    const start = new draw2d.shape.node.Start();
    const end   = new draw2d.shape.node.End();
    
    // ...add it to the canvas 
    canvas.add( start, 50,50);
    canvas.add( end, 230,80);
    
    // Create a Connection and connect the Start and End node
    //
    var c = new draw2d.Connection();
    
    
    // Set the endpoint decorations for the connection
    //
    c.setSourceDecorator(new draw2d.decoration.connection.BarDecorator());
    c.setTargetDecorator(new draw2d.decoration.connection.DiamondDecorator());   
    // Connect the endpoints with the start and end port
    //
    c.setSource(start.getOutputPort(0));
    c.setTarget(end.getInputPort(0));
    
    // and finally add the connection to the canvas
    canvas.add(c);
    window.el = c.getShapeElement().node;
    $(c.getShapeElement().node).attr('stroke', "url(#grad2)");
});


