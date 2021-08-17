jest.dontMock('../dist/index');
var uttalat = require('../dist/index');
var m = uttalat.default();
var addBundle = m.addBundle;

function addBundles() {
    addBundle({
        enkom: {
            snabel: 'Klura',
            kollra: {
                flumm: 'Enkelt'
            }
        },
        vilsen: 'snabbt',
        lust: {
            unken: 'ytterst'
        }
    });

    addBundle({
        vilsen: 'havande',
        lust: {
            unken: 'innerst',
            ranson: 'fikon',
            lillen: {
                ryttare: 'skriver :liten uppsats',
                flingsalt: 'hepp :tuff: <a href="mailto::minMail">knaper</a> :snabel:elak och bitter'
            }
        }
    });
}

addBundles();

describe('get messages', function() {

    it('checks that bundles are added and messages can be fetched', function() {
        expect(m('enkom.snabel')).toBe('Klura');
        expect(m('enkom.kollra.flumm')).toBe('Enkelt');
        expect(m('vilsen')).toBe('snabbt');
        expect(m('lust.unken')).toBe('ytterst');
        expect(m('lust.ranson')).toBe('fikon');
        expect(m('lust.ranson.pulver')).toBe('lust.ranson.pulver');
    });

    it('checks default key if key not found', function() {
        expect(m('enkom.snabel.buffel', 'enkom.snabel')).toBe('Klura');
        expect(m('enkom.snabel.buffel', 'enkom.snabel.ilsken')).toBe('enkom.snabel.buffel');
    });

    it('checks that argument object can be supplied to replace variables', function() {
        expect(m('lust.lillen.ryttare', 'enkom.snabel', {liten: 'skarp'})).toBe('skriver skarp uppsats');
        expect(m('not_exist', 'lust.lillen.flingsalt', {tuff: 'butter', minMail: 'klarblank@test.se', snabel: 'akter'}))
            .toBe('hepp butter: <a href="mailto:klarblank@test.se">knaper</a> akter:elak och bitter');
    });

    it('checks override in addBundle', function() {
        addBundle({
            vilsen: 'Absorberat'
        }, true);

        expect(m('vilsen')).toBe('Absorberat');
    });
});
