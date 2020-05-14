import "core-js";
import App from './app';

declare const define: any;
declare const exports: any;
declare global {
    interface Window { MoscowMetro: any; }
    interface Document {
        selection: any;
        getElementsByClassName: (classNames: string) => HTMLCollectionOf<Element>;
        querySelectorAll: (clasname: string) => HTMLCollectionOf<Element>;
    }
    interface SVGElement {
        getElementsByClassName: (classNames: string) => HTMLCollectionOf<Element>;
        querySelectorAll: (className: string) => HTMLCollectionOf<Element>;
    }
}

const isRequireJS = (): boolean => typeof define === 'function' && define.amd;
const isCommonJS = (): boolean => typeof exports === 'object' && typeof module === 'object';

if (!document.getElementsByClassName) {
    document.getElementsByClassName = function (classNames: string): HTMLCollectionOf<Element> {
        var d = document, elements, pattern, i;
        var results: HTMLCollectionOf<HTMLElement>[] | any;

        if (results === undefined) {
            results = []
        }

        if (d.querySelectorAll) {
            return d.querySelectorAll("." + classNames);
        }
        if (d.evaluate) {
            pattern = ".//*[contains(concat(' ', @class, ' '), ' " + classNames + " ')]";
            elements = d.evaluate(pattern, d, null, 0, null);
            while ((i = elements.iterateNext())) {
                results.push(i);
            }
        } else {
            elements = d.getElementsByTagName("*");
            pattern = new RegExp("(^|\\s)" + classNames + "(\\s|$)");
            for (i = 0; i < elements.length; i++) {
                if (pattern.test(elements[i].className)) {
                    results.push(elements[i]);
                }
            }
        }
        return results;
    }
}

if (SVGElement.prototype.getElementsByClassName === undefined) {
    SVGElement.prototype.getElementsByClassName = function (className: string) {
        return this.querySelectorAll('.' + className);
    };
}

(() => {
    if (typeof window !== 'undefined') {
        window.MoscowMetro = App;
        console.log(1);
        const previous = window.MoscowMetro;
        console.log(2);
        window.MoscowMetro = App;
        console.log('3dd');
        window.MoscowMetro.noConflict = () => {
            console.log(4);

            window.MoscowMetro = previous;
        };
        return;
    }

    if (isCommonJS()) {
        console.log('isCommonJS');
        return module.exports = App;
    }

    if (isRequireJS()) {
        console.log('isCommonJS');
        return define(App);
    }

    throw new Error('This environment was not anticipated by Moscow Metro');
})();
