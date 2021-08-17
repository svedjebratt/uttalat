export default function uttalat() {
    const bundles = [];

    function addBundle(bundle, override) {
        if (override) {
            bundles.splice(0, 0, bundle);
        } else {
            bundles.push(bundle);
        }
    }

    function getHtmlMessage(key, args) {
        return {__html: getMessage(key, args)};
    }

    function getMessage(key) {
        let message;

        const keys = Array.prototype.slice.call(arguments, 1).reduce((list, arg) => {
            if (typeof arg === 'string') {
                list.push(arg);
            }
            return list;
        }, [key]);

        top:
        for (let i = 0; i < keys.length; i++) {
            for (let j = 0; j < bundles.length; j++) {
                message = findMessageInBundle(keys[i], bundles[j]);

                if (message !== false) {
                    break top;
                }
            }
        }

        if (message === false) {
            message = key;
        }

        let args = null;
        if (typeof arguments[arguments.length - 1] === 'object') {
            args = arguments[arguments.length - 1];
        }

        return replace(message, args);
    }

    function findMessageInBundle(key, bundle) {
        return key.split('.').reduce((prev, current) => {
            if (typeof prev === 'object' && prev.hasOwnProperty(current)) {
                return prev[current];
            }

            return false;
        }, bundle);
    }

    function replace(message, args) {
        if (args) {
            return Object.keys(args).reduce((text, key) => text.replace(new RegExp(`:${key}`, 'g'), args[key]), message);
        }

        return message;
    }

    getMessage.getHtmlMessage = getHtmlMessage;
    getMessage.addBundle = addBundle;

    return getMessage;
}
