
import jquery from 'jquery';
import "jquery-ui-bundle";
import * as draw2d from 'draw2d';

import {createSvgLinearGradient} from './util/svg/svg-utils'
import { Gradient } from './connection/gradient';
import { GradientConnection } from './connection/gradient-connection';


jquery(window).ready(function () {

    const canvas = new draw2d.Canvas("gfx_holder");
    window.canvas = canvas;
    const grad1 = new Gradient(
        'grad1',
        [0,0],
        [100,0],
        [{colorString: '#47D4E6', offset: 50}, {colorString: 'rgb(255,0,0)', offset: 50}],
        '#47D4E6' 
    );
    const grad2 = new Gradient(
        'grad2',
        [0,0],
        [100,0],
        [{colorString: 'rgb(255,0,0)', offset: 50}, {colorString: '#47D4E6', offset: 50}],
        '#47D4E6'
    );
        

    const start = new draw2d.shape.node.Start();
    const end   = new draw2d.shape.node.End();
    
    // ...add it to the canvas 
    canvas.add( start, 50,50);
    canvas.add( end, 230,80);
    
    // Create a Connection and connect the Start and End node
    //
    var c = new GradientConnection();
    
    
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
    c.setColor(grad1);
    c.setColor(grad2);
    // c.setColor('#47D4E6');
});


