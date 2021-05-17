import * as draw2d from "draw2d";
import { extend } from "jquery";
import { Gradient } from "./gradient";

export class GradientConnection extends draw2d.Connection.extend({
    NAME: "GradientConnection",

    init: function( attr, setter, getter) {
        this._super(attr, setter, getter)
    }
})
{

    /**
     *
     *
     * @param {Gradient | String | draw2d.util.Color } color
     * @memberof GradientConnection
     */
    setColor(color)
    {
        if(color instanceof Gradient)
        {
            if(!($(`#${color.id}`).length))
            {
                if(this.getCanvas()) {
                    this.getCanvas().paper.canvas.getElementsByTagName('defs')[0].appendChild(color.element);
                    $(this.getShapeElement().node).attr('stroke', `url(#${color.id}`);
                } else {
                    const cb = (emitter) => {
                        emitter.getCanvas().paper.canvas.getElementsByTagName('defs')[0].appendChild(color.element);
                        $(emitter.getShapeElement().node).attr('stroke', `url(#${color.id}`);
                    };
                    this.on('added', (emitter => {
                        cb(emitter);
                        emitter.off(cb);
                    }));
                }
            } else {
                $(this.getShapeElement().node).attr('stroke', `url(#${color.id}`);
            }
            const lc = color.defaultColor ? color.defaultColor : '#000';
            this.lineColor = new draw2d.util.Color(new draw2d.util.Color(lc));
            this.fireEvent("change:color",{value:this.lineColor});
        }
        else {
            super.setColor(color);
        }
        return this;
    }
}