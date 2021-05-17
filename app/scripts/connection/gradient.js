export class Gradient {

    /**
     * @typedef {Object} Stop
     * @property {number} offset
     * @property {string} colorString
     * @property {number} [opacity]
     *
     * @export
     * @param {string} id
     * @param {number[]} startXY
     * @param {number[]} endXY
     * @param {Stop[]} stops
     * @param {string} [defaultColor]
     */
    constructor(id, startXY=[0,0], endXY=[100,0], stops, defaultColor=null)
    {
        this.id = id;
        this.startXY = startXY;
        this.endXY = endXY;
        this.stops = stops || [{colorString: '#000', offset: 100}];
        this.defaultColor = defaultColor || stops[0].colorString;

        this.element = this._createGradient(this.id, this.startXY, this.endXY, this.stops);
        
    }

     /**
     * @export
     * @param {string} id
     * @param {number[]} startXY
     * @param {number[]} endXY
     * @param {Stop[]} stops
     */
    _createGradient(id, startXY, endXY, stops)
    {
        
        const svgns = 'http://www.w3.org/2000/svg';
        // Create <svg>, <defs>, <linearGradient> and <rect> elements using createElementNS to apply the SVG namespace.
        // (https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS)
        const gradient = document.createElementNS(svgns, 'linearGradient');

        gradient.setAttribute('id', '' + id);
        gradient.setAttribute('x1', '' + startXY[0] + '%');
        gradient.setAttribute('y1', '' + startXY[1] + '%');
        gradient.setAttribute('x2', '' + endXY[0] + '%');
        gradient.setAttribute('y2', '' + endXY[1] + '%');

    // Parses an array of stop information and appends <stop> elements to the <linearGradient>
        for (var i = 0, length = stops.length; i < length; i++) {
            // Create a <stop> element and set its offset based on the position of the for loop.
            var stop = document.createElementNS(svgns, 'stop');
            stop.setAttribute('offset', "" + stops[i].offset + "%");
            stop.setAttribute('stop-color', stops[i].colorString);
            stop.setAttribute('stop-opacity', "" + stops[i].offset || 1);

            // Add the stop to the <lineargradient> element.
            gradient.appendChild(stop);
        }
        return gradient;
    }
}