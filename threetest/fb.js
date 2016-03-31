/*!CK:695801969!*/ /*1456272865,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["JousV"]); }

__d("VideoProjection", [], function a(b, c, d, e, f, g) { c.__markCompiled && c.__markCompiled();
    f.exports = { FLAT: "flat", EQUIRECTANGULAR: "equirectangular", CUBEMAP: "cubemap", PYRAMID: "pyramid" }; }, null);
__d("createExponentialMovingAverage", [], function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(k) {
        var l = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1],
            m = l;
        return function(n) {
            return m += k * (n - m); }; }

    function i(k) {
        return function(l) {
            return 1 - Math.exp(-l / k); }; }

    function j(k) {
        var l = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1],
            m = l,
            n = i(k);
        return function(o, p) {
            return m += n(p) * (o - m); }; }
    h.createContinuous = j;
    f.exports = h; }, null);
__d('VelocityTracker', ['createExponentialMovingAverage', 'performanceNow'], function a(b, c, d, e, f, g, h, i) {
    if (c.__markCompiled) c.__markCompiled();

    function j() {
        var k = arguments.length <= 0 || arguments[0] === undefined ? 50 : arguments[0],
            l = arguments.length <= 1 || arguments[1] === undefined ? { x: 0, y: 0 } : arguments[1]; 'use strict';
        this.$VelocityTracker5 = l.x;
        this.$VelocityTracker6 = l.y;
        this.$VelocityTracker1 = i();
        this.$VelocityTracker2 = h.createContinuous(k, this.$VelocityTracker5);
        this.$VelocityTracker3 = h.createContinuous(k, this.$VelocityTracker6); }
    j.prototype.update = function(k, l) { 'use strict';
        var m = 0;
        if (this.$VelocityTracker4) { m = i() - this.$VelocityTracker1;
            m = this.updateVelocity((k - this.$VelocityTracker4.x) * 1000 / m, (l - this.$VelocityTracker4.y) * 1000 / m); } else this.$VelocityTracker1 = i();
        this.$VelocityTracker4 = { x: k, y: l };
        return m; };
    j.prototype.updateVelocity = function(k, l) { 'use strict';
        var m = i(),
            n = m - this.$VelocityTracker1;
        this.$VelocityTracker1 = m;
        this.$VelocityTracker5 = this.$VelocityTracker2(k, n);
        this.$VelocityTracker6 = this.$VelocityTracker3(l, n);
        return n; };
    j.prototype.getVelocityX = function() { 'use strict';
        return Math.trunc(this.$VelocityTracker5); };
    j.prototype.getVelocityY = function() { 'use strict';
        return Math.trunc(this.$VelocityTracker6); };
    j.prototype.getSpeed = function() { 'use strict';
        return Math.trunc(Math.sqrt(this.$VelocityTracker5 * this.$VelocityTracker5 + this.$VelocityTracker6 * this.$VelocityTracker6)); };
    f.exports = j; }, null);
__d("bezier", [], function a(b, c, d, e, f, g) { c.__markCompiled && c.__markCompiled();
    f.exports = function(h, i, j, k, l) {
        var m = function(p) {
                var q = 1 - p;
                return 3 * q * q * p * h + 3 * q * p * p * j + p * p * p; },
            n = function(p) {
                var q = 1 - p;
                return 3 * q * q * p * i + 3 * q * p * p * k + p * p * p; },
            o = function(p) {
                var q = 1 - p;
                return 3 * (2 * (p - 1) * p + q * q) * h + 3 * (-p * p * p + 2 * q * p) * j; };
        return function(p) {
            var q = p,
                r, s, t, u, v, w;
            for (t = q, w = 0; w < 8; w++) { u = m(t) - q;
                if (Math.abs(u) < l) return n(t);
                v = o(t);
                if (Math.abs(v) < 1e-06) break;
                t = t - u / v; }
            r = 0, s = 1, t = q;
            if (t < r) return n(r);
            if (t > s) return n(s);
            while (r < s) { u = m(t);
                if (Math.abs(u - q) < l) return n(t);
                if (q > u) { r = t; } else s = t;
                t = (s - r) * .5 + r; }
            return n(t); }; }; }, null);
__d('VideoWithPlayerVersionInvariant', [], function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(i, j) { 'use strict';
        this.$VideoWithPlayerVersionInvariant1 = i;
        this.$VideoWithPlayerVersionInvariant2 = j;
        this.$VideoWithPlayerVersionInvariant3 = i.addListener('stateChange', function() {
            return this.$VideoWithPlayerVersionInvariant4(); }.bind(this)); }
    h.prototype.$VideoWithPlayerVersionInvariant4 = function() { 'use strict';
        if (!this.$VideoWithPlayerVersionInvariant1.isState('ready')) return;
        if (!this.$VideoWithPlayerVersionInvariant1.isPlayerVersion(this.$VideoWithPlayerVersionInvariant2)) this.$VideoWithPlayerVersionInvariant1.setState('fallback');
        this.$VideoWithPlayerVersionInvariant3.remove(); };
    f.exports = h; }, null);
__d("GLMatrix", [], function a(b, c, d, e, f, g) { c.__markCompiled && c.__markCompiled();
    (function(h, i) { i(h); }(f.exports, function(h) { "use strict";
        var i = 1e-06,
            j = {};
        (function() {
            if (typeof(Float32Array) != 'undefined') {
                var ba = new Float32Array(1),
                    ca = new Int32Array(ba.buffer);
                j.invsqrt = function(da) {
                    var ea = da * .5;
                    ba[0] = da;
                    var fa = 1.5;
                    ca[0] = 1597463007 - (ca[0] >> 1);
                    var ga = ba[0];
                    return ga * (fa - (ea * ga * ga)); }; } else j.invsqrt = function(da) {
                return 1 / Math.sqrt(da); }; })();
        var k = null;

        function l(ba) { k = ba;
            return k; }

        function m() { k = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
            return k; }
        m();
        var n = {};
        n.create = function(ba) {
            var ca = new k(3);
            if (ba) { ca[0] = ba[0];
                ca[1] = ba[1];
                ca[2] = ba[2]; } else ca[0] = ca[1] = ca[2] = 0;
            return ca; };
        n.createFrom = function(ba, ca, da) {
            var ea = new k(3);
            ea[0] = ba;
            ea[1] = ca;
            ea[2] = da;
            return ea; };
        n.set = function(ba, ca) { ca[0] = ba[0];
            ca[1] = ba[1];
            ca[2] = ba[2];
            return ca; };
        n.equal = function(ba, ca) {
            return ba === ca || (Math.abs(ba[0] - ca[0]) < i && Math.abs(ba[1] - ca[1]) < i && Math.abs(ba[2] - ca[2]) < i); };
        n.add = function(ba, ca, da) {
            if (!da || ba === da) { ba[0] += ca[0];
                ba[1] += ca[1];
                ba[2] += ca[2];
                return ba; }
            da[0] = ba[0] + ca[0];
            da[1] = ba[1] + ca[1];
            da[2] = ba[2] + ca[2];
            return da; };
        n.subtract = function(ba, ca, da) {
            if (!da || ba === da) { ba[0] -= ca[0];
                ba[1] -= ca[1];
                ba[2] -= ca[2];
                return ba; }
            da[0] = ba[0] - ca[0];
            da[1] = ba[1] - ca[1];
            da[2] = ba[2] - ca[2];
            return da; };
        n.multiply = function(ba, ca, da) {
            if (!da || ba === da) { ba[0] *= ca[0];
                ba[1] *= ca[1];
                ba[2] *= ca[2];
                return ba; }
            da[0] = ba[0] * ca[0];
            da[1] = ba[1] * ca[1];
            da[2] = ba[2] * ca[2];
            return da; };
        n.negate = function(ba, ca) {
            if (!ca) ca = ba;
            ca[0] = -ba[0];
            ca[1] = -ba[1];
            ca[2] = -ba[2];
            return ca; };
        n.scale = function(ba, ca, da) {
            if (!da || ba === da) { ba[0] *= ca;
                ba[1] *= ca;
                ba[2] *= ca;
                return ba; }
            da[0] = ba[0] * ca;
            da[1] = ba[1] * ca;
            da[2] = ba[2] * ca;
            return da; };
        n.normalize = function(ba, ca) {
            if (!ca) ca = ba;
            var da = ba[0],
                ea = ba[1],
                fa = ba[2],
                ga = Math.sqrt(da * da + ea * ea + fa * fa);
            if (!ga) { ca[0] = 0;
                ca[1] = 0;
                ca[2] = 0;
                return ca; } else if (ga === 1) { ca[0] = da;
                ca[1] = ea;
                ca[2] = fa;
                return ca; }
            ga = 1 / ga;
            ca[0] = da * ga;
            ca[1] = ea * ga;
            ca[2] = fa * ga;
            return ca; };
        n.cross = function(ba, ca, da) {
            if (!da) da = ba;
            var ea = ba[0],
                fa = ba[1],
                ga = ba[2],
                ha = ca[0],
                ia = ca[1],
                ja = ca[2];
            da[0] = fa * ja - ga * ia;
            da[1] = ga * ha - ea * ja;
            da[2] = ea * ia - fa * ha;
            return da; };
        n.length = function(ba) {
            var ca = ba[0],
                da = ba[1],
                ea = ba[2];
            return Math.sqrt(ca * ca + da * da + ea * ea); };
        n.squaredLength = function(ba) {
            var ca = ba[0],
                da = ba[1],
                ea = ba[2];
            return ca * ca + da * da + ea * ea; };
        n.dot = function(ba, ca) {
            return ba[0] * ca[0] + ba[1] * ca[1] + ba[2] * ca[2]; };
        n.direction = function(ba, ca, da) {
            if (!da) da = ba;
            var ea = ba[0] - ca[0],
                fa = ba[1] - ca[1],
                ga = ba[2] - ca[2],
                ha = Math.sqrt(ea * ea + fa * fa + ga * ga);
            if (!ha) { da[0] = 0;
                da[1] = 0;
                da[2] = 0;
                return da; }
            ha = 1 / ha;
            da[0] = ea * ha;
            da[1] = fa * ha;
            da[2] = ga * ha;
            return da; };
        n.lerp = function(ba, ca, da, ea) {
            if (!ea) ea = ba;
            ea[0] = ba[0] + da * (ca[0] - ba[0]);
            ea[1] = ba[1] + da * (ca[1] - ba[1]);
            ea[2] = ba[2] + da * (ca[2] - ba[2]);
            return ea; };
        n.dist = function(ba, ca) {
            var da = ca[0] - ba[0],
                ea = ca[1] - ba[1],
                fa = ca[2] - ba[2];
            return Math.sqrt(da * da + ea * ea + fa * fa); };
        var o = null,
            p = new k(4);
        n.unproject = function(ba, ca, da, ea, fa) {
            if (!fa) fa = ba;
            if (!o) o = v.create();
            var ga = o,
                ha = p;
            ha[0] = (ba[0] - ea[0]) * 2 / ea[2] - 1;
            ha[1] = (ba[1] - ea[1]) * 2 / ea[3] - 1;
            ha[2] = 2 * ba[2] - 1;
            ha[3] = 1;
            v.multiply(da, ca, ga);
            if (!v.inverse(ga)) return null;
            v.multiplyVec4(ga, ha);
            if (ha[3] === 0) return null;
            fa[0] = ha[0] / ha[3];
            fa[1] = ha[1] / ha[3];
            fa[2] = ha[2] / ha[3];
            return fa; };
        var q = n.createFrom(1, 0, 0),
            r = n.createFrom(0, 1, 0),
            s = n.createFrom(0, 0, 1),
            t = n.create();
        n.rotationTo = function(ba, ca, da) {
            if (!da) da = w.create();
            var ea = n.dot(ba, ca),
                fa = t;
            if (ea >= 1) { w.set(x, da); } else if (ea < (1e-06 - 1)) { n.cross(q, ba, fa);
                if (n.length(fa) < 1e-06) n.cross(r, ba, fa);
                if (n.length(fa) < 1e-06) n.cross(s, ba, fa);
                n.normalize(fa);
                w.fromAngleAxis(Math.PI, fa, da); } else {
                var ga = Math.sqrt((1 + ea) * 2),
                    ha = 1 / ga;
                n.cross(ba, ca, fa);
                da[0] = fa[0] * ha;
                da[1] = fa[1] * ha;
                da[2] = fa[2] * ha;
                da[3] = ga * .5;
                w.normalize(da); }
            if (da[3] > 1) { da[3] = 1; } else if (da[3] < -1) da[3] = -1;
            return da; };
        n.str = function(ba) {
            return '[' + ba[0] + ', ' + ba[1] + ', ' + ba[2] + ']'; };
        var u = {};
        u.create = function(ba) {
            var ca = new k(9);
            if (ba) { ca[0] = ba[0];
                ca[1] = ba[1];
                ca[2] = ba[2];
                ca[3] = ba[3];
                ca[4] = ba[4];
                ca[5] = ba[5];
                ca[6] = ba[6];
                ca[7] = ba[7];
                ca[8] = ba[8]; } else ca[0] = ca[1] = ca[2] = ca[3] = ca[4] = ca[5] = ca[6] = ca[7] = ca[8] = 0;
            return ca; };
        u.createFrom = function(ba, ca, da, ea, fa, ga, ha, ia, ja) {
            var ka = new k(9);
            ka[0] = ba;
            ka[1] = ca;
            ka[2] = da;
            ka[3] = ea;
            ka[4] = fa;
            ka[5] = ga;
            ka[6] = ha;
            ka[7] = ia;
            ka[8] = ja;
            return ka; };
        u.determinant = function(ba) {
            var ca = ba[0],
                da = ba[1],
                ea = ba[2],
                fa = ba[3],
                ga = ba[4],
                ha = ba[5],
                ia = ba[6],
                ja = ba[7],
                ka = ba[8];
            return ca * (ka * ga - ha * ja) + da * (-ka * fa + ha * ia) + ea * (ja * fa - ga * ia); };
        u.inverse = function(ba, ca) {
            var da = ba[0],
                ea = ba[1],
                fa = ba[2],
                ga = ba[3],
                ha = ba[4],
                ia = ba[5],
                ja = ba[6],
                ka = ba[7],
                la = ba[8],
                ma = la * ha - ia * ka,
                na = -la * ga + ia * ja,
                oa = ka * ga - ha * ja,
                pa = da * ma + ea * na + fa * oa,
                qa;
            if (!pa) return null;
            qa = 1 / pa;
            if (!ca) ca = u.create();
            ca[0] = ma * qa;
            ca[1] = (-la * ea + fa * ka) * qa;
            ca[2] = (ia * ea - fa * ha) * qa;
            ca[3] = na * qa;
            ca[4] = (la * da - fa * ja) * qa;
            ca[5] = (-ia * da + fa * ga) * qa;
            ca[6] = oa * qa;
            ca[7] = (-ka * da + ea * ja) * qa;
            ca[8] = (ha * da - ea * ga) * qa;
            return ca; };
        u.multiply = function(ba, ca, da) {
            if (!da) da = ba;
            var ea = ba[0],
                fa = ba[1],
                ga = ba[2],
                ha = ba[3],
                ia = ba[4],
                ja = ba[5],
                ka = ba[6],
                la = ba[7],
                ma = ba[8],
                na = ca[0],
                oa = ca[1],
                pa = ca[2],
                qa = ca[3],
                ra = ca[4],
                sa = ca[5],
                ta = ca[6],
                ua = ca[7],
                va = ca[8];
            da[0] = na * ea + oa * ha + pa * ka;
            da[1] = na * fa + oa * ia + pa * la;
            da[2] = na * ga + oa * ja + pa * ma;
            da[3] = qa * ea + ra * ha + sa * ka;
            da[4] = qa * fa + ra * ia + sa * la;
            da[5] = qa * ga + ra * ja + sa * ma;
            da[6] = ta * ea + ua * ha + va * ka;
            da[7] = ta * fa + ua * ia + va * la;
            da[8] = ta * ga + ua * ja + va * ma;
            return da; };
        u.multiplyVec2 = function(ba, ca, da) {
            if (!da) da = ca;
            var ea = ca[0],
                fa = ca[1];
            da[0] = ea * ba[0] + fa * ba[3] + ba[6];
            da[1] = ea * ba[1] + fa * ba[4] + ba[7];
            return da; };
        u.multiplyVec3 = function(ba, ca, da) {
            if (!da) da = ca;
            var ea = ca[0],
                fa = ca[1],
                ga = ca[2];
            da[0] = ea * ba[0] + fa * ba[3] + ga * ba[6];
            da[1] = ea * ba[1] + fa * ba[4] + ga * ba[7];
            da[2] = ea * ba[2] + fa * ba[5] + ga * ba[8];
            return da; };
        u.set = function(ba, ca) { ca[0] = ba[0];
            ca[1] = ba[1];
            ca[2] = ba[2];
            ca[3] = ba[3];
            ca[4] = ba[4];
            ca[5] = ba[5];
            ca[6] = ba[6];
            ca[7] = ba[7];
            ca[8] = ba[8];
            return ca; };
        u.equal = function(ba, ca) {
            return ba === ca || (Math.abs(ba[0] - ca[0]) < i && Math.abs(ba[1] - ca[1]) < i && Math.abs(ba[2] - ca[2]) < i && Math.abs(ba[3] - ca[3]) < i && Math.abs(ba[4] - ca[4]) < i && Math.abs(ba[5] - ca[5]) < i && Math.abs(ba[6] - ca[6]) < i && Math.abs(ba[7] - ca[7]) < i && Math.abs(ba[8] - ca[8]) < i); };
        u.identity = function(ba) {
            if (!ba) ba = u.create();
            ba[0] = 1;
            ba[1] = 0;
            ba[2] = 0;
            ba[3] = 0;
            ba[4] = 1;
            ba[5] = 0;
            ba[6] = 0;
            ba[7] = 0;
            ba[8] = 1;
            return ba; };
        u.transpose = function(ba, ca) {
            if (!ca || ba === ca) {
                var da = ba[1],
                    ea = ba[2],
                    fa = ba[5];
                ba[1] = ba[3];
                ba[2] = ba[6];
                ba[3] = da;
                ba[5] = ba[7];
                ba[6] = ea;
                ba[7] = fa;
                return ba; }
            ca[0] = ba[0];
            ca[1] = ba[3];
            ca[2] = ba[6];
            ca[3] = ba[1];
            ca[4] = ba[4];
            ca[5] = ba[7];
            ca[6] = ba[2];
            ca[7] = ba[5];
            ca[8] = ba[8];
            return ca; };
        u.toMat4 = function(ba, ca) {
            if (!ca) ca = v.create();
            ca[15] = 1;
            ca[14] = 0;
            ca[13] = 0;
            ca[12] = 0;
            ca[11] = 0;
            ca[10] = ba[8];
            ca[9] = ba[7];
            ca[8] = ba[6];
            ca[7] = 0;
            ca[6] = ba[5];
            ca[5] = ba[4];
            ca[4] = ba[3];
            ca[3] = 0;
            ca[2] = ba[2];
            ca[1] = ba[1];
            ca[0] = ba[0];
            return ca; };
        u.str = function(ba) {
            return '[' + ba[0] + ', ' + ba[1] + ', ' + ba[2] + ', ' + ba[3] + ', ' + ba[4] + ', ' + ba[5] + ', ' + ba[6] + ', ' + ba[7] + ', ' + ba[8] + ']'; };
        var v = {};
        v.create = function(ba) {
            var ca = new k(16);
            if (ba) { ca[0] = ba[0];
                ca[1] = ba[1];
                ca[2] = ba[2];
                ca[3] = ba[3];
                ca[4] = ba[4];
                ca[5] = ba[5];
                ca[6] = ba[6];
                ca[7] = ba[7];
                ca[8] = ba[8];
                ca[9] = ba[9];
                ca[10] = ba[10];
                ca[11] = ba[11];
                ca[12] = ba[12];
                ca[13] = ba[13];
                ca[14] = ba[14];
                ca[15] = ba[15]; }
            return ca; };
        v.createFrom = function(ba, ca, da, ea, fa, ga, ha, ia, ja, ka, la, ma, na, oa, pa, qa) {
            var ra = new k(16);
            ra[0] = ba;
            ra[1] = ca;
            ra[2] = da;
            ra[3] = ea;
            ra[4] = fa;
            ra[5] = ga;
            ra[6] = ha;
            ra[7] = ia;
            ra[8] = ja;
            ra[9] = ka;
            ra[10] = la;
            ra[11] = ma;
            ra[12] = na;
            ra[13] = oa;
            ra[14] = pa;
            ra[15] = qa;
            return ra; };
        v.set = function(ba, ca) { ca[0] = ba[0];
            ca[1] = ba[1];
            ca[2] = ba[2];
            ca[3] = ba[3];
            ca[4] = ba[4];
            ca[5] = ba[5];
            ca[6] = ba[6];
            ca[7] = ba[7];
            ca[8] = ba[8];
            ca[9] = ba[9];
            ca[10] = ba[10];
            ca[11] = ba[11];
            ca[12] = ba[12];
            ca[13] = ba[13];
            ca[14] = ba[14];
            ca[15] = ba[15];
            return ca; };
        v.equal = function(ba, ca) {
            return ba === ca || (Math.abs(ba[0] - ca[0]) < i && Math.abs(ba[1] - ca[1]) < i && Math.abs(ba[2] - ca[2]) < i && Math.abs(ba[3] - ca[3]) < i && Math.abs(ba[4] - ca[4]) < i && Math.abs(ba[5] - ca[5]) < i && Math.abs(ba[6] - ca[6]) < i && Math.abs(ba[7] - ca[7]) < i && Math.abs(ba[8] - ca[8]) < i && Math.abs(ba[9] - ca[9]) < i && Math.abs(ba[10] - ca[10]) < i && Math.abs(ba[11] - ca[11]) < i && Math.abs(ba[12] - ca[12]) < i && Math.abs(ba[13] - ca[13]) < i && Math.abs(ba[14] - ca[14]) < i && Math.abs(ba[15] - ca[15]) < i); };
        v.identity = function(ba) {
            if (!ba) ba = v.create();
            ba[0] = 1;
            ba[1] = 0;
            ba[2] = 0;
            ba[3] = 0;
            ba[4] = 0;
            ba[5] = 1;
            ba[6] = 0;
            ba[7] = 0;
            ba[8] = 0;
            ba[9] = 0;
            ba[10] = 1;
            ba[11] = 0;
            ba[12] = 0;
            ba[13] = 0;
            ba[14] = 0;
            ba[15] = 1;
            return ba; };
        v.transpose = function(ba, ca) {
            if (!ca || ba === ca) {
                var da = ba[1],
                    ea = ba[2],
                    fa = ba[3],
                    ga = ba[6],
                    ha = ba[7],
                    ia = ba[11];
                ba[1] = ba[4];
                ba[2] = ba[8];
                ba[3] = ba[12];
                ba[4] = da;
                ba[6] = ba[9];
                ba[7] = ba[13];
                ba[8] = ea;
                ba[9] = ga;
                ba[11] = ba[14];
                ba[12] = fa;
                ba[13] = ha;
                ba[14] = ia;
                return ba; }
            ca[0] = ba[0];
            ca[1] = ba[4];
            ca[2] = ba[8];
            ca[3] = ba[12];
            ca[4] = ba[1];
            ca[5] = ba[5];
            ca[6] = ba[9];
            ca[7] = ba[13];
            ca[8] = ba[2];
            ca[9] = ba[6];
            ca[10] = ba[10];
            ca[11] = ba[14];
            ca[12] = ba[3];
            ca[13] = ba[7];
            ca[14] = ba[11];
            ca[15] = ba[15];
            return ca; };
        v.determinant = function(ba) {
            var ca = ba[0],
                da = ba[1],
                ea = ba[2],
                fa = ba[3],
                ga = ba[4],
                ha = ba[5],
                ia = ba[6],
                ja = ba[7],
                ka = ba[8],
                la = ba[9],
                ma = ba[10],
                na = ba[11],
                oa = ba[12],
                pa = ba[13],
                qa = ba[14],
                ra = ba[15];
            return (oa * la * ia * fa - ka * pa * ia * fa - oa * ha * ma * fa + ga * pa * ma * fa + ka * ha * qa * fa - ga * la * qa * fa - oa * la * ea * ja + ka * pa * ea * ja + oa * da * ma * ja - ca * pa * ma * ja - ka * da * qa * ja + ca * la * qa * ja + oa * ha * ea * na - ga * pa * ea * na - oa * da * ia * na + ca * pa * ia * na + ga * da * qa * na - ca * ha * qa * na - ka * ha * ea * ra + ga * la * ea * ra + ka * da * ia * ra - ca * la * ia * ra - ga * da * ma * ra + ca * ha * ma * ra); };
        v.inverse = function(ba, ca) {
            if (!ca) ca = ba;
            var da = ba[0],
                ea = ba[1],
                fa = ba[2],
                ga = ba[3],
                ha = ba[4],
                ia = ba[5],
                ja = ba[6],
                ka = ba[7],
                la = ba[8],
                ma = ba[9],
                na = ba[10],
                oa = ba[11],
                pa = ba[12],
                qa = ba[13],
                ra = ba[14],
                sa = ba[15],
                ta = da * ia - ea * ha,
                ua = da * ja - fa * ha,
                va = da * ka - ga * ha,
                wa = ea * ja - fa * ia,
                xa = ea * ka - ga * ia,
                ya = fa * ka - ga * ja,
                za = la * qa - ma * pa,
                ab = la * ra - na * pa,
                bb = la * sa - oa * pa,
                cb = ma * ra - na * qa,
                db = ma * sa - oa * qa,
                eb = na * sa - oa * ra,
                fb = (ta * eb - ua * db + va * cb + wa * bb - xa * ab + ya * za),
                gb;
            if (!fb) return null;
            gb = 1 / fb;
            ca[0] = (ia * eb - ja * db + ka * cb) * gb;
            ca[1] = (-ea * eb + fa * db - ga * cb) * gb;
            ca[2] = (qa * ya - ra * xa + sa * wa) * gb;
            ca[3] = (-ma * ya + na * xa - oa * wa) * gb;
            ca[4] = (-ha * eb + ja * bb - ka * ab) * gb;
            ca[5] = (da * eb - fa * bb + ga * ab) * gb;
            ca[6] = (-pa * ya + ra * va - sa * ua) * gb;
            ca[7] = (la * ya - na * va + oa * ua) * gb;
            ca[8] = (ha * db - ia * bb + ka * za) * gb;
            ca[9] = (-da * db + ea * bb - ga * za) * gb;
            ca[10] = (pa * xa - qa * va + sa * ta) * gb;
            ca[11] = (-la * xa + ma * va - oa * ta) * gb;
            ca[12] = (-ha * cb + ia * ab - ja * za) * gb;
            ca[13] = (da * cb - ea * ab + fa * za) * gb;
            ca[14] = (-pa * wa + qa * ua - ra * ta) * gb;
            ca[15] = (la * wa - ma * ua + na * ta) * gb;
            return ca; };
        v.toRotationMat = function(ba, ca) {
            if (!ca) ca = v.create();
            ca[0] = ba[0];
            ca[1] = ba[1];
            ca[2] = ba[2];
            ca[3] = ba[3];
            ca[4] = ba[4];
            ca[5] = ba[5];
            ca[6] = ba[6];
            ca[7] = ba[7];
            ca[8] = ba[8];
            ca[9] = ba[9];
            ca[10] = ba[10];
            ca[11] = ba[11];
            ca[12] = 0;
            ca[13] = 0;
            ca[14] = 0;
            ca[15] = 1;
            return ca; };
        v.toMat3 = function(ba, ca) {
            if (!ca) ca = u.create();
            ca[0] = ba[0];
            ca[1] = ba[1];
            ca[2] = ba[2];
            ca[3] = ba[4];
            ca[4] = ba[5];
            ca[5] = ba[6];
            ca[6] = ba[8];
            ca[7] = ba[9];
            ca[8] = ba[10];
            return ca; };
        v.toInverseMat3 = function(ba, ca) {
            var da = ba[0],
                ea = ba[1],
                fa = ba[2],
                ga = ba[4],
                ha = ba[5],
                ia = ba[6],
                ja = ba[8],
                ka = ba[9],
                la = ba[10],
                ma = la * ha - ia * ka,
                na = -la * ga + ia * ja,
                oa = ka * ga - ha * ja,
                pa = da * ma + ea * na + fa * oa,
                qa;
            if (!pa) return null;
            qa = 1 / pa;
            if (!ca) ca = u.create();
            ca[0] = ma * qa;
            ca[1] = (-la * ea + fa * ka) * qa;
            ca[2] = (ia * ea - fa * ha) * qa;
            ca[3] = na * qa;
            ca[4] = (la * da - fa * ja) * qa;
            ca[5] = (-ia * da + fa * ga) * qa;
            ca[6] = oa * qa;
            ca[7] = (-ka * da + ea * ja) * qa;
            ca[8] = (ha * da - ea * ga) * qa;
            return ca; };
        v.multiply = function(ba, ca, da) {
            if (!da) da = ba;
            var ea = ba[0],
                fa = ba[1],
                ga = ba[2],
                ha = ba[3],
                ia = ba[4],
                ja = ba[5],
                ka = ba[6],
                la = ba[7],
                ma = ba[8],
                na = ba[9],
                oa = ba[10],
                pa = ba[11],
                qa = ba[12],
                ra = ba[13],
                sa = ba[14],
                ta = ba[15],
                ua = ca[0],
                va = ca[1],
                wa = ca[2],
                xa = ca[3];
            da[0] = ua * ea + va * ia + wa * ma + xa * qa;
            da[1] = ua * fa + va * ja + wa * na + xa * ra;
            da[2] = ua * ga + va * ka + wa * oa + xa * sa;
            da[3] = ua * ha + va * la + wa * pa + xa * ta;
            ua = ca[4];
            va = ca[5];
            wa = ca[6];
            xa = ca[7];
            da[4] = ua * ea + va * ia + wa * ma + xa * qa;
            da[5] = ua * fa + va * ja + wa * na + xa * ra;
            da[6] = ua * ga + va * ka + wa * oa + xa * sa;
            da[7] = ua * ha + va * la + wa * pa + xa * ta;
            ua = ca[8];
            va = ca[9];
            wa = ca[10];
            xa = ca[11];
            da[8] = ua * ea + va * ia + wa * ma + xa * qa;
            da[9] = ua * fa + va * ja + wa * na + xa * ra;
            da[10] = ua * ga + va * ka + wa * oa + xa * sa;
            da[11] = ua * ha + va * la + wa * pa + xa * ta;
            ua = ca[12];
            va = ca[13];
            wa = ca[14];
            xa = ca[15];
            da[12] = ua * ea + va * ia + wa * ma + xa * qa;
            da[13] = ua * fa + va * ja + wa * na + xa * ra;
            da[14] = ua * ga + va * ka + wa * oa + xa * sa;
            da[15] = ua * ha + va * la + wa * pa + xa * ta;
            return da; };
        v.multiplyVec3 = function(ba, ca, da) {
            if (!da) da = ca;
            var ea = ca[0],
                fa = ca[1],
                ga = ca[2];
            da[0] = ba[0] * ea + ba[4] * fa + ba[8] * ga + ba[12];
            da[1] = ba[1] * ea + ba[5] * fa + ba[9] * ga + ba[13];
            da[2] = ba[2] * ea + ba[6] * fa + ba[10] * ga + ba[14];
            return da; };
        v.multiplyVec4 = function(ba, ca, da) {
            if (!da) da = ca;
            var ea = ca[0],
                fa = ca[1],
                ga = ca[2],
                ha = ca[3];
            da[0] = ba[0] * ea + ba[4] * fa + ba[8] * ga + ba[12] * ha;
            da[1] = ba[1] * ea + ba[5] * fa + ba[9] * ga + ba[13] * ha;
            da[2] = ba[2] * ea + ba[6] * fa + ba[10] * ga + ba[14] * ha;
            da[3] = ba[3] * ea + ba[7] * fa + ba[11] * ga + ba[15] * ha;
            return da; };
        v.translate = function(ba, ca, da) {
            var ea = ca[0],
                fa = ca[1],
                ga = ca[2],
                ha, ia, ja, ka, la, ma, na, oa, pa, qa, ra, sa;
            if (!da || ba === da) { ba[12] = ba[0] * ea + ba[4] * fa + ba[8] * ga + ba[12];
                ba[13] = ba[1] * ea + ba[5] * fa + ba[9] * ga + ba[13];
                ba[14] = ba[2] * ea + ba[6] * fa + ba[10] * ga + ba[14];
                ba[15] = ba[3] * ea + ba[7] * fa + ba[11] * ga + ba[15];
                return ba; }
            ha = ba[0];
            ia = ba[1];
            ja = ba[2];
            ka = ba[3];
            la = ba[4];
            ma = ba[5];
            na = ba[6];
            oa = ba[7];
            pa = ba[8];
            qa = ba[9];
            ra = ba[10];
            sa = ba[11];
            da[0] = ha;
            da[1] = ia;
            da[2] = ja;
            da[3] = ka;
            da[4] = la;
            da[5] = ma;
            da[6] = na;
            da[7] = oa;
            da[8] = pa;
            da[9] = qa;
            da[10] = ra;
            da[11] = sa;
            da[12] = ha * ea + la * fa + pa * ga + ba[12];
            da[13] = ia * ea + ma * fa + qa * ga + ba[13];
            da[14] = ja * ea + na * fa + ra * ga + ba[14];
            da[15] = ka * ea + oa * fa + sa * ga + ba[15];
            return da; };
        v.scale = function(ba, ca, da) {
            var ea = ca[0],
                fa = ca[1],
                ga = ca[2];
            if (!da || ba === da) { ba[0] *= ea;
                ba[1] *= ea;
                ba[2] *= ea;
                ba[3] *= ea;
                ba[4] *= fa;
                ba[5] *= fa;
                ba[6] *= fa;
                ba[7] *= fa;
                ba[8] *= ga;
                ba[9] *= ga;
                ba[10] *= ga;
                ba[11] *= ga;
                return ba; }
            da[0] = ba[0] * ea;
            da[1] = ba[1] * ea;
            da[2] = ba[2] * ea;
            da[3] = ba[3] * ea;
            da[4] = ba[4] * fa;
            da[5] = ba[5] * fa;
            da[6] = ba[6] * fa;
            da[7] = ba[7] * fa;
            da[8] = ba[8] * ga;
            da[9] = ba[9] * ga;
            da[10] = ba[10] * ga;
            da[11] = ba[11] * ga;
            da[12] = ba[12];
            da[13] = ba[13];
            da[14] = ba[14];
            da[15] = ba[15];
            return da; };
        v.rotate = function(ba, ca, da, ea) {
            var fa = da[0],
                ga = da[1],
                ha = da[2],
                ia = Math.sqrt(fa * fa + ga * ga + ha * ha),
                ja, ka, la, ma, na, oa, pa, qa, ra, sa, ta, ua, va, wa, xa, ya, za, ab, bb, cb, db, eb, fb, gb;
            if (!ia) return null;
            if (ia !== 1) { ia = 1 / ia;
                fa *= ia;
                ga *= ia;
                ha *= ia; }
            ja = Math.sin(ca);
            ka = Math.cos(ca);
            la = 1 - ka;
            ma = ba[0];
            na = ba[1];
            oa = ba[2];
            pa = ba[3];
            qa = ba[4];
            ra = ba[5];
            sa = ba[6];
            ta = ba[7];
            ua = ba[8];
            va = ba[9];
            wa = ba[10];
            xa = ba[11];
            ya = fa * fa * la + ka;
            za = ga * fa * la + ha * ja;
            ab = ha * fa * la - ga * ja;
            bb = fa * ga * la - ha * ja;
            cb = ga * ga * la + ka;
            db = ha * ga * la + fa * ja;
            eb = fa * ha * la + ga * ja;
            fb = ga * ha * la - fa * ja;
            gb = ha * ha * la + ka;
            if (!ea) { ea = ba; } else if (ba !== ea) { ea[12] = ba[12];
                ea[13] = ba[13];
                ea[14] = ba[14];
                ea[15] = ba[15]; }
            ea[0] = ma * ya + qa * za + ua * ab;
            ea[1] = na * ya + ra * za + va * ab;
            ea[2] = oa * ya + sa * za + wa * ab;
            ea[3] = pa * ya + ta * za + xa * ab;
            ea[4] = ma * bb + qa * cb + ua * db;
            ea[5] = na * bb + ra * cb + va * db;
            ea[6] = oa * bb + sa * cb + wa * db;
            ea[7] = pa * bb + ta * cb + xa * db;
            ea[8] = ma * eb + qa * fb + ua * gb;
            ea[9] = na * eb + ra * fb + va * gb;
            ea[10] = oa * eb + sa * fb + wa * gb;
            ea[11] = pa * eb + ta * fb + xa * gb;
            return ea; };
        v.rotateX = function(ba, ca, da) {
            var ea = Math.sin(ca),
                fa = Math.cos(ca),
                ga = ba[4],
                ha = ba[5],
                ia = ba[6],
                ja = ba[7],
                ka = ba[8],
                la = ba[9],
                ma = ba[10],
                na = ba[11];
            if (!da) { da = ba; } else if (ba !== da) { da[0] = ba[0];
                da[1] = ba[1];
                da[2] = ba[2];
                da[3] = ba[3];
                da[12] = ba[12];
                da[13] = ba[13];
                da[14] = ba[14];
                da[15] = ba[15]; }
            da[4] = ga * fa + ka * ea;
            da[5] = ha * fa + la * ea;
            da[6] = ia * fa + ma * ea;
            da[7] = ja * fa + na * ea;
            da[8] = ga * -ea + ka * fa;
            da[9] = ha * -ea + la * fa;
            da[10] = ia * -ea + ma * fa;
            da[11] = ja * -ea + na * fa;
            return da; };
        v.rotateY = function(ba, ca, da) {
            var ea = Math.sin(ca),
                fa = Math.cos(ca),
                ga = ba[0],
                ha = ba[1],
                ia = ba[2],
                ja = ba[3],
                ka = ba[8],
                la = ba[9],
                ma = ba[10],
                na = ba[11];
            if (!da) { da = ba; } else if (ba !== da) { da[4] = ba[4];
                da[5] = ba[5];
                da[6] = ba[6];
                da[7] = ba[7];
                da[12] = ba[12];
                da[13] = ba[13];
                da[14] = ba[14];
                da[15] = ba[15]; }
            da[0] = ga * fa + ka * -ea;
            da[1] = ha * fa + la * -ea;
            da[2] = ia * fa + ma * -ea;
            da[3] = ja * fa + na * -ea;
            da[8] = ga * ea + ka * fa;
            da[9] = ha * ea + la * fa;
            da[10] = ia * ea + ma * fa;
            da[11] = ja * ea + na * fa;
            return da; };
        v.rotateZ = function(ba, ca, da) {
            var ea = Math.sin(ca),
                fa = Math.cos(ca),
                ga = ba[0],
                ha = ba[1],
                ia = ba[2],
                ja = ba[3],
                ka = ba[4],
                la = ba[5],
                ma = ba[6],
                na = ba[7];
            if (!da) { da = ba; } else if (ba !== da) { da[8] = ba[8];
                da[9] = ba[9];
                da[10] = ba[10];
                da[11] = ba[11];
                da[12] = ba[12];
                da[13] = ba[13];
                da[14] = ba[14];
                da[15] = ba[15]; }
            da[0] = ga * fa + ka * ea;
            da[1] = ha * fa + la * ea;
            da[2] = ia * fa + ma * ea;
            da[3] = ja * fa + na * ea;
            da[4] = ga * -ea + ka * fa;
            da[5] = ha * -ea + la * fa;
            da[6] = ia * -ea + ma * fa;
            da[7] = ja * -ea + na * fa;
            return da; };
        v.frustum = function(ba, ca, da, ea, fa, ga, ha) {
            if (!ha) ha = v.create();
            var ia = (ca - ba),
                ja = (ea - da),
                ka = (ga - fa);
            ha[0] = (fa * 2) / ia;
            ha[1] = 0;
            ha[2] = 0;
            ha[3] = 0;
            ha[4] = 0;
            ha[5] = (fa * 2) / ja;
            ha[6] = 0;
            ha[7] = 0;
            ha[8] = (ca + ba) / ia;
            ha[9] = (ea + da) / ja;
            ha[10] = -(ga + fa) / ka;
            ha[11] = -1;
            ha[12] = 0;
            ha[13] = 0;
            ha[14] = -(ga * fa * 2) / ka;
            ha[15] = 0;
            return ha; };
        v.perspective = function(ba, ca, da, ea, fa) {
            var ga = da * Math.tan(ba * Math.PI / 360),
                ha = ga * ca;
            return v.frustum(-ha, ha, -ga, ga, da, ea, fa); };
        v.ortho = function(ba, ca, da, ea, fa, ga, ha) {
            if (!ha) ha = v.create();
            var ia = (ca - ba),
                ja = (ea - da),
                ka = (ga - fa);
            ha[0] = 2 / ia;
            ha[1] = 0;
            ha[2] = 0;
            ha[3] = 0;
            ha[4] = 0;
            ha[5] = 2 / ja;
            ha[6] = 0;
            ha[7] = 0;
            ha[8] = 0;
            ha[9] = 0;
            ha[10] = -2 / ka;
            ha[11] = 0;
            ha[12] = -(ba + ca) / ia;
            ha[13] = -(ea + da) / ja;
            ha[14] = -(ga + fa) / ka;
            ha[15] = 1;
            return ha; };
        v.lookAt = function(ba, ca, da, ea) {
            if (!ea) ea = v.create();
            var fa, ga, ha, ia, ja, ka, la, ma, na, oa, pa = ba[0],
                qa = ba[1],
                ra = ba[2],
                sa = da[0],
                ta = da[1],
                ua = da[2],
                va = ca[0],
                wa = ca[1],
                xa = ca[2];
            if (pa === va && qa === wa && ra === xa) return v.identity(ea);
            la = pa - va;
            ma = qa - wa;
            na = ra - xa;
            oa = 1 / Math.sqrt(la * la + ma * ma + na * na);
            la *= oa;
            ma *= oa;
            na *= oa;
            fa = ta * na - ua * ma;
            ga = ua * la - sa * na;
            ha = sa * ma - ta * la;
            oa = Math.sqrt(fa * fa + ga * ga + ha * ha);
            if (!oa) { fa = 0;
                ga = 0;
                ha = 0; } else { oa = 1 / oa;
                fa *= oa;
                ga *= oa;
                ha *= oa; }
            ia = ma * ha - na * ga;
            ja = na * fa - la * ha;
            ka = la * ga - ma * fa;
            oa = Math.sqrt(ia * ia + ja * ja + ka * ka);
            if (!oa) { ia = 0;
                ja = 0;
                ka = 0; } else { oa = 1 / oa;
                ia *= oa;
                ja *= oa;
                ka *= oa; }
            ea[0] = fa;
            ea[1] = ia;
            ea[2] = la;
            ea[3] = 0;
            ea[4] = ga;
            ea[5] = ja;
            ea[6] = ma;
            ea[7] = 0;
            ea[8] = ha;
            ea[9] = ka;
            ea[10] = na;
            ea[11] = 0;
            ea[12] = -(fa * pa + ga * qa + ha * ra);
            ea[13] = -(ia * pa + ja * qa + ka * ra);
            ea[14] = -(la * pa + ma * qa + na * ra);
            ea[15] = 1;
            return ea; };
        v.fromRotationTranslation = function(ba, ca, da) {
            if (!da) da = v.create();
            var ea = ba[0],
                fa = ba[1],
                ga = ba[2],
                ha = ba[3],
                ia = ea + ea,
                ja = fa + fa,
                ka = ga + ga,
                la = ea * ia,
                ma = ea * ja,
                na = ea * ka,
                oa = fa * ja,
                pa = fa * ka,
                qa = ga * ka,
                ra = ha * ia,
                sa = ha * ja,
                ta = ha * ka;
            da[0] = 1 - (oa + qa);
            da[1] = ma + ta;
            da[2] = na - sa;
            da[3] = 0;
            da[4] = ma - ta;
            da[5] = 1 - (la + qa);
            da[6] = pa + ra;
            da[7] = 0;
            da[8] = na + sa;
            da[9] = pa - ra;
            da[10] = 1 - (la + oa);
            da[11] = 0;
            da[12] = ca[0];
            da[13] = ca[1];
            da[14] = ca[2];
            da[15] = 1;
            return da; };
        v.str = function(ba) {
            return '[' + ba[0] + ', ' + ba[1] + ', ' + ba[2] + ', ' + ba[3] + ', ' + ba[4] + ', ' + ba[5] + ', ' + ba[6] + ', ' + ba[7] + ', ' + ba[8] + ', ' + ba[9] + ', ' + ba[10] + ', ' + ba[11] + ', ' + ba[12] + ', ' + ba[13] + ', ' + ba[14] + ', ' + ba[15] + ']'; };
        var w = {};
        w.create = function(ba) {
            var ca = new k(4);
            if (ba) { ca[0] = ba[0];
                ca[1] = ba[1];
                ca[2] = ba[2];
                ca[3] = ba[3]; } else ca[0] = ca[1] = ca[2] = ca[3] = 0;
            return ca; };
        w.createFrom = function(ba, ca, da, ea) {
            var fa = new k(4);
            fa[0] = ba;
            fa[1] = ca;
            fa[2] = da;
            fa[3] = ea;
            return fa; };
        w.set = function(ba, ca) { ca[0] = ba[0];
            ca[1] = ba[1];
            ca[2] = ba[2];
            ca[3] = ba[3];
            return ca; };
        w.equal = function(ba, ca) {
            return ba === ca || (Math.abs(ba[0] - ca[0]) < i && Math.abs(ba[1] - ca[1]) < i && Math.abs(ba[2] - ca[2]) < i && Math.abs(ba[3] - ca[3]) < i); };
        w.identity = function(ba) {
            if (!ba) ba = w.create();
            ba[0] = 0;
            ba[1] = 0;
            ba[2] = 0;
            ba[3] = 1;
            return ba; };
        var x = w.identity();
        w.calculateW = function(ba, ca) {
            var da = ba[0],
                ea = ba[1],
                fa = ba[2];
            if (!ca || ba === ca) { ba[3] = -Math.sqrt(Math.abs(1 - da * da - ea * ea - fa * fa));
                return ba; }
            ca[0] = da;
            ca[1] = ea;
            ca[2] = fa;
            ca[3] = -Math.sqrt(Math.abs(1 - da * da - ea * ea - fa * fa));
            return ca; };
        w.dot = function(ba, ca) {
            return ba[0] * ca[0] + ba[1] * ca[1] + ba[2] * ca[2] + ba[3] * ca[3]; };
        w.inverse = function(ba, ca) {
            var da = ba[0],
                ea = ba[1],
                fa = ba[2],
                ga = ba[3],
                ha = da * da + ea * ea + fa * fa + ga * ga,
                ia = ha ? 1 / ha : 0;
            if (!ca || ba === ca) { ba[0] *= -ia;
                ba[1] *= -ia;
                ba[2] *= -ia;
                ba[3] *= ia;
                return ba; }
            ca[0] = -ba[0] * ia;
            ca[1] = -ba[1] * ia;
            ca[2] = -ba[2] * ia;
            ca[3] = ba[3] * ia;
            return ca; };
        w.conjugate = function(ba, ca) {
            if (!ca || ba === ca) { ba[0] *= -1;
                ba[1] *= -1;
                ba[2] *= -1;
                return ba; }
            ca[0] = -ba[0];
            ca[1] = -ba[1];
            ca[2] = -ba[2];
            ca[3] = ba[3];
            return ca; };
        w.length = function(ba) {
            var ca = ba[0],
                da = ba[1],
                ea = ba[2],
                fa = ba[3];
            return Math.sqrt(ca * ca + da * da + ea * ea + fa * fa); };
        w.normalize = function(ba, ca) {
            if (!ca) ca = ba;
            var da = ba[0],
                ea = ba[1],
                fa = ba[2],
                ga = ba[3],
                ha = Math.sqrt(da * da + ea * ea + fa * fa + ga * ga);
            if (ha === 0) { ca[0] = 0;
                ca[1] = 0;
                ca[2] = 0;
                ca[3] = 0;
                return ca; }
            ha = 1 / ha;
            ca[0] = da * ha;
            ca[1] = ea * ha;
            ca[2] = fa * ha;
            ca[3] = ga * ha;
            return ca; };
        w.add = function(ba, ca, da) {
            if (!da || ba === da) { ba[0] += ca[0];
                ba[1] += ca[1];
                ba[2] += ca[2];
                ba[3] += ca[3];
                return ba; }
            da[0] = ba[0] + ca[0];
            da[1] = ba[1] + ca[1];
            da[2] = ba[2] + ca[2];
            da[3] = ba[3] + ca[3];
            return da; };
        w.multiply = function(ba, ca, da) {
            if (!da) da = ba;
            var ea = ba[0],
                fa = ba[1],
                ga = ba[2],
                ha = ba[3],
                ia = ca[0],
                ja = ca[1],
                ka = ca[2],
                la = ca[3];
            da[0] = ea * la + ha * ia + fa * ka - ga * ja;
            da[1] = fa * la + ha * ja + ga * ia - ea * ka;
            da[2] = ga * la + ha * ka + ea * ja - fa * ia;
            da[3] = ha * la - ea * ia - fa * ja - ga * ka;
            return da; };
        w.multiplyVec3 = function(ba, ca, da) {
            if (!da) da = ca;
            var ea = ca[0],
                fa = ca[1],
                ga = ca[2],
                ha = ba[0],
                ia = ba[1],
                ja = ba[2],
                ka = ba[3],
                la = ka * ea + ia * ga - ja * fa,
                ma = ka * fa + ja * ea - ha * ga,
                na = ka * ga + ha * fa - ia * ea,
                oa = -ha * ea - ia * fa - ja * ga;
            da[0] = la * ka + oa * -ha + ma * -ja - na * -ia;
            da[1] = ma * ka + oa * -ia + na * -ha - la * -ja;
            da[2] = na * ka + oa * -ja + la * -ia - ma * -ha;
            return da; };
        w.scale = function(ba, ca, da) {
            if (!da || ba === da) { ba[0] *= ca;
                ba[1] *= ca;
                ba[2] *= ca;
                ba[3] *= ca;
                return ba; }
            da[0] = ba[0] * ca;
            da[1] = ba[1] * ca;
            da[2] = ba[2] * ca;
            da[3] = ba[3] * ca;
            return da; };
        w.toMat3 = function(ba, ca) {
            if (!ca) ca = u.create();
            var da = ba[0],
                ea = ba[1],
                fa = ba[2],
                ga = ba[3],
                ha = da + da,
                ia = ea + ea,
                ja = fa + fa,
                ka = da * ha,
                la = da * ia,
                ma = da * ja,
                na = ea * ia,
                oa = ea * ja,
                pa = fa * ja,
                qa = ga * ha,
                ra = ga * ia,
                sa = ga * ja;
            ca[0] = 1 - (na + pa);
            ca[1] = la + sa;
            ca[2] = ma - ra;
            ca[3] = la - sa;
            ca[4] = 1 - (ka + pa);
            ca[5] = oa + qa;
            ca[6] = ma + ra;
            ca[7] = oa - qa;
            ca[8] = 1 - (ka + na);
            return ca; };
        w.toMat4 = function(ba, ca) {
            if (!ca) ca = v.create();
            var da = ba[0],
                ea = ba[1],
                fa = ba[2],
                ga = ba[3],
                ha = da + da,
                ia = ea + ea,
                ja = fa + fa,
                ka = da * ha,
                la = da * ia,
                ma = da * ja,
                na = ea * ia,
                oa = ea * ja,
                pa = fa * ja,
                qa = ga * ha,
                ra = ga * ia,
                sa = ga * ja;
            ca[0] = 1 - (na + pa);
            ca[1] = la + sa;
            ca[2] = ma - ra;
            ca[3] = 0;
            ca[4] = la - sa;
            ca[5] = 1 - (ka + pa);
            ca[6] = oa + qa;
            ca[7] = 0;
            ca[8] = ma + ra;
            ca[9] = oa - qa;
            ca[10] = 1 - (ka + na);
            ca[11] = 0;
            ca[12] = 0;
            ca[13] = 0;
            ca[14] = 0;
            ca[15] = 1;
            return ca; };
        w.slerp = function(ba, ca, da, ea) {
            if (!ea) ea = ba;
            var fa = ba[0] * ca[0] + ba[1] * ca[1] + ba[2] * ca[2] + ba[3] * ca[3],
                ga, ha, ia, ja;
            if (Math.abs(fa) >= 1) {
                if (ea !== ba) { ea[0] = ba[0];
                    ea[1] = ba[1];
                    ea[2] = ba[2];
                    ea[3] = ba[3]; }
                return ea; }
            ga = Math.acos(fa);
            ha = Math.sqrt(1 - fa * fa);
            if (Math.abs(ha) < .001) { ea[0] = (ba[0] * .5 + ca[0] * .5);
                ea[1] = (ba[1] * .5 + ca[1] * .5);
                ea[2] = (ba[2] * .5 + ca[2] * .5);
                ea[3] = (ba[3] * .5 + ca[3] * .5);
                return ea; }
            ia = Math.sin((1 - da) * ga) / ha;
            ja = Math.sin(da * ga) / ha;
            ea[0] = (ba[0] * ia + ca[0] * ja);
            ea[1] = (ba[1] * ia + ca[1] * ja);
            ea[2] = (ba[2] * ia + ca[2] * ja);
            ea[3] = (ba[3] * ia + ca[3] * ja);
            return ea; };
        w.fromRotationMatrix = function(ba, ca) {
            if (!ca) ca = w.create();
            var da = ba[0] + ba[4] + ba[8],
                ea;
            if (da > 0) { ea = Math.sqrt(da + 1);
                ca[3] = .5 * ea;
                ea = .5 / ea;
                ca[0] = (ba[7] - ba[5]) * ea;
                ca[1] = (ba[2] - ba[6]) * ea;
                ca[2] = (ba[3] - ba[1]) * ea; } else {
                var fa = w.fromRotationMatrix.s_iNext = w.fromRotationMatrix.s_iNext || [1, 2, 0],
                    ga = 0;
                if (ba[4] > ba[0]) ga = 1;
                if (ba[8] > ba[ga * 3 + ga]) ga = 2;
                var ha = fa[ga],
                    ia = fa[ha];
                ea = Math.sqrt(ba[ga * 3 + ga] - ba[ha * 3 + ha] - ba[ia * 3 + ia] + 1);
                ca[ga] = .5 * ea;
                ea = .5 / ea;
                ca[3] = (ba[ia * 3 + ha] - ba[ha * 3 + ia]) * ea;
                ca[ha] = (ba[ha * 3 + ga] + ba[ga * 3 + ha]) * ea;
                ca[ia] = (ba[ia * 3 + ga] + ba[ga * 3 + ia]) * ea; }
            return ca; };
        u.toQuat4 = w.fromRotationMatrix;
        (function() {
            var ba = u.create();
            w.fromAxes = function(ca, da, ea, fa) { ba[0] = da[0];
                ba[3] = da[1];
                ba[6] = da[2];
                ba[1] = ea[0];
                ba[4] = ea[1];
                ba[7] = ea[2];
                ba[2] = ca[0];
                ba[5] = ca[1];
                ba[8] = ca[2];
                return w.fromRotationMatrix(ba, fa); }; })();
        w.identity = function(ba) {
            if (!ba) ba = w.create();
            ba[0] = 0;
            ba[1] = 0;
            ba[2] = 0;
            ba[3] = 1;
            return ba; };
        w.fromAngleAxis = function(ba, ca, da) {
            if (!da) da = w.create();
            var ea = ba * .5,
                fa = Math.sin(ea);
            da[3] = Math.cos(ea);
            da[0] = fa * ca[0];
            da[1] = fa * ca[1];
            da[2] = fa * ca[2];
            return da; };
        w.toAngleAxis = function(ba, ca) {
            if (!ca) ca = ba;
            var da = ba[0] * ba[0] + ba[1] * ba[1] + ba[2] * ba[2];
            if (da > 0) { ca[3] = 2 * Math.acos(ba[3]);
                var ea = j.invsqrt(da);
                ca[0] = ba[0] * ea;
                ca[1] = ba[1] * ea;
                ca[2] = ba[2] * ea; } else { ca[3] = 0;
                ca[0] = 1;
                ca[1] = 0;
                ca[2] = 0; }
            return ca; };
        w.str = function(ba) {
            return '[' + ba[0] + ', ' + ba[1] + ', ' + ba[2] + ', ' + ba[3] + ']'; };
        var y = {};
        y.create = function(ba) {
            var ca = new k(2);
            if (ba) { ca[0] = ba[0];
                ca[1] = ba[1]; } else { ca[0] = 0;
                ca[1] = 0; }
            return ca; };
        y.createFrom = function(ba, ca) {
            var da = new k(2);
            da[0] = ba;
            da[1] = ca;
            return da; };
        y.add = function(ba, ca, da) {
            if (!da) da = ca;
            da[0] = ba[0] + ca[0];
            da[1] = ba[1] + ca[1];
            return da; };
        y.subtract = function(ba, ca, da) {
            if (!da) da = ca;
            da[0] = ba[0] - ca[0];
            da[1] = ba[1] - ca[1];
            return da; };
        y.multiply = function(ba, ca, da) {
            if (!da) da = ca;
            da[0] = ba[0] * ca[0];
            da[1] = ba[1] * ca[1];
            return da; };
        y.divide = function(ba, ca, da) {
            if (!da) da = ca;
            da[0] = ba[0] / ca[0];
            da[1] = ba[1] / ca[1];
            return da; };
        y.scale = function(ba, ca, da) {
            if (!da) da = ba;
            da[0] = ba[0] * ca;
            da[1] = ba[1] * ca;
            return da; };
        y.dist = function(ba, ca) {
            var da = ca[0] - ba[0],
                ea = ca[1] - ba[1];
            return Math.sqrt(da * da + ea * ea); };
        y.set = function(ba, ca) { ca[0] = ba[0];
            ca[1] = ba[1];
            return ca; };
        y.equal = function(ba, ca) {
            return ba === ca || (Math.abs(ba[0] - ca[0]) < i && Math.abs(ba[1] - ca[1]) < i); };
        y.negate = function(ba, ca) {
            if (!ca) ca = ba;
            ca[0] = -ba[0];
            ca[1] = -ba[1];
            return ca; };
        y.normalize = function(ba, ca) {
            if (!ca) ca = ba;
            var da = ba[0] * ba[0] + ba[1] * ba[1];
            if (da > 0) { da = Math.sqrt(da);
                ca[0] = ba[0] / da;
                ca[1] = ba[1] / da; } else ca[0] = ca[1] = 0;
            return ca; };
        y.cross = function(ba, ca, da) {
            var ea = ba[0] * ca[1] - ba[1] * ca[0];
            if (!da) return ea;
            da[0] = da[1] = 0;
            da[2] = ea;
            return da; };
        y.length = function(ba) {
            var ca = ba[0],
                da = ba[1];
            return Math.sqrt(ca * ca + da * da); };
        y.squaredLength = function(ba) {
            var ca = ba[0],
                da = ba[1];
            return ca * ca + da * da; };
        y.dot = function(ba, ca) {
            return ba[0] * ca[0] + ba[1] * ca[1]; };
        y.direction = function(ba, ca, da) {
            if (!da) da = ba;
            var ea = ba[0] - ca[0],
                fa = ba[1] - ca[1],
                ga = ea * ea + fa * fa;
            if (!ga) { da[0] = 0;
                da[1] = 0;
                da[2] = 0;
                return da; }
            ga = 1 / Math.sqrt(ga);
            da[0] = ea * ga;
            da[1] = fa * ga;
            return da; };
        y.lerp = function(ba, ca, da, ea) {
            if (!ea) ea = ba;
            ea[0] = ba[0] + da * (ca[0] - ba[0]);
            ea[1] = ba[1] + da * (ca[1] - ba[1]);
            return ea; };
        y.str = function(ba) {
            return '[' + ba[0] + ', ' + ba[1] + ']'; };
        var z = {};
        z.create = function(ba) {
            var ca = new k(4);
            if (ba) { ca[0] = ba[0];
                ca[1] = ba[1];
                ca[2] = ba[2];
                ca[3] = ba[3]; } else ca[0] = ca[1] = ca[2] = ca[3] = 0;
            return ca; };
        z.createFrom = function(ba, ca, da, ea) {
            var fa = new k(4);
            fa[0] = ba;
            fa[1] = ca;
            fa[2] = da;
            fa[3] = ea;
            return fa; };
        z.set = function(ba, ca) { ca[0] = ba[0];
            ca[1] = ba[1];
            ca[2] = ba[2];
            ca[3] = ba[3];
            return ca; };
        z.equal = function(ba, ca) {
            return ba === ca || (Math.abs(ba[0] - ca[0]) < i && Math.abs(ba[1] - ca[1]) < i && Math.abs(ba[2] - ca[2]) < i && Math.abs(ba[3] - ca[3]) < i); };
        z.identity = function(ba) {
            if (!ba) ba = z.create();
            ba[0] = 1;
            ba[1] = 0;
            ba[2] = 0;
            ba[3] = 1;
            return ba; };
        z.transpose = function(ba, ca) {
            if (!ca || ba === ca) {
                var da = ba[1];
                ba[1] = ba[2];
                ba[2] = da;
                return ba; }
            ca[0] = ba[0];
            ca[1] = ba[2];
            ca[2] = ba[1];
            ca[3] = ba[3];
            return ca; };
        z.determinant = function(ba) {
            return ba[0] * ba[3] - ba[2] * ba[1]; };
        z.inverse = function(ba, ca) {
            if (!ca) ca = ba;
            var da = ba[0],
                ea = ba[1],
                fa = ba[2],
                ga = ba[3],
                ha = da * ga - fa * ea;
            if (!ha) return null;
            ha = 1 / ha;
            ca[0] = ga * ha;
            ca[1] = -ea * ha;
            ca[2] = -fa * ha;
            ca[3] = da * ha;
            return ca; };
        z.multiply = function(ba, ca, da) {
            if (!da) da = ba;
            var ea = ba[0],
                fa = ba[1],
                ga = ba[2],
                ha = ba[3];
            da[0] = ea * ca[0] + fa * ca[2];
            da[1] = ea * ca[1] + fa * ca[3];
            da[2] = ga * ca[0] + ha * ca[2];
            da[3] = ga * ca[1] + ha * ca[3];
            return da; };
        z.rotate = function(ba, ca, da) {
            if (!da) da = ba;
            var ea = ba[0],
                fa = ba[1],
                ga = ba[2],
                ha = ba[3],
                ia = Math.sin(ca),
                ja = Math.cos(ca);
            da[0] = ea * ja + fa * ia;
            da[1] = ea * -ia + fa * ja;
            da[2] = ga * ja + ha * ia;
            da[3] = ga * -ia + ha * ja;
            return da; };
        z.multiplyVec2 = function(ba, ca, da) {
            if (!da) da = ca;
            var ea = ca[0],
                fa = ca[1];
            da[0] = ea * ba[0] + fa * ba[1];
            da[1] = ea * ba[2] + fa * ba[3];
            return da; };
        z.scale = function(ba, ca, da) {
            if (!da) da = ba;
            var ea = ba[0],
                fa = ba[1],
                ga = ba[2],
                ha = ba[3],
                ia = ca[0],
                ja = ca[1];
            da[0] = ea * ia;
            da[1] = fa * ja;
            da[2] = ga * ia;
            da[3] = ha * ja;
            return da; };
        z.str = function(ba) {
            return '[' + ba[0] + ', ' + ba[1] + ', ' + ba[2] + ', ' + ba[3] + ']'; };
        var aa = {};
        aa.create = function(ba) {
            var ca = new k(4);
            if (ba) { ca[0] = ba[0];
                ca[1] = ba[1];
                ca[2] = ba[2];
                ca[3] = ba[3]; } else { ca[0] = 0;
                ca[1] = 0;
                ca[2] = 0;
                ca[3] = 0; }
            return ca; };
        aa.createFrom = function(ba, ca, da, ea) {
            var fa = new k(4);
            fa[0] = ba;
            fa[1] = ca;
            fa[2] = da;
            fa[3] = ea;
            return fa; };
        aa.add = function(ba, ca, da) {
            if (!da) da = ca;
            da[0] = ba[0] + ca[0];
            da[1] = ba[1] + ca[1];
            da[2] = ba[2] + ca[2];
            da[3] = ba[3] + ca[3];
            return da; };
        aa.subtract = function(ba, ca, da) {
            if (!da) da = ca;
            da[0] = ba[0] - ca[0];
            da[1] = ba[1] - ca[1];
            da[2] = ba[2] - ca[2];
            da[3] = ba[3] - ca[3];
            return da; };
        aa.multiply = function(ba, ca, da) {
            if (!da) da = ca;
            da[0] = ba[0] * ca[0];
            da[1] = ba[1] * ca[1];
            da[2] = ba[2] * ca[2];
            da[3] = ba[3] * ca[3];
            return da; };
        aa.divide = function(ba, ca, da) {
            if (!da) da = ca;
            da[0] = ba[0] / ca[0];
            da[1] = ba[1] / ca[1];
            da[2] = ba[2] / ca[2];
            da[3] = ba[3] / ca[3];
            return da; };
        aa.scale = function(ba, ca, da) {
            if (!da) da = ba;
            da[0] = ba[0] * ca;
            da[1] = ba[1] * ca;
            da[2] = ba[2] * ca;
            da[3] = ba[3] * ca;
            return da; };
        aa.set = function(ba, ca) { ca[0] = ba[0];
            ca[1] = ba[1];
            ca[2] = ba[2];
            ca[3] = ba[3];
            return ca; };
        aa.equal = function(ba, ca) {
            return ba === ca || (Math.abs(ba[0] - ca[0]) < i && Math.abs(ba[1] - ca[1]) < i && Math.abs(ba[2] - ca[2]) < i && Math.abs(ba[3] - ca[3]) < i); };
        aa.negate = function(ba, ca) {
            if (!ca) ca = ba;
            ca[0] = -ba[0];
            ca[1] = -ba[1];
            ca[2] = -ba[2];
            ca[3] = -ba[3];
            return ca; };
        aa.length = function(ba) {
            var ca = ba[0],
                da = ba[1],
                ea = ba[2],
                fa = ba[3];
            return Math.sqrt(ca * ca + da * da + ea * ea + fa * fa); };
        aa.squaredLength = function(ba) {
            var ca = ba[0],
                da = ba[1],
                ea = ba[2],
                fa = ba[3];
            return ca * ca + da * da + ea * ea + fa * fa; };
        aa.lerp = function(ba, ca, da, ea) {
            if (!ea) ea = ba;
            ea[0] = ba[0] + da * (ca[0] - ba[0]);
            ea[1] = ba[1] + da * (ca[1] - ba[1]);
            ea[2] = ba[2] + da * (ca[2] - ba[2]);
            ea[3] = ba[3] + da * (ca[3] - ba[3]);
            return ea; };
        aa.str = function(ba) {
            return '[' + ba[0] + ', ' + ba[1] + ', ' + ba[2] + ', ' + ba[3] + ']'; };
        if (h) { h.glMatrixArrayType = k;
            h.MatrixArray = k;
            h.setMatrixArrayType = l;
            h.determineMatrixArrayType = m;
            h.glMath = j;
            h.vec2 = y;
            h.vec3 = n;
            h.vec4 = aa;
            h.mat2 = z;
            h.mat3 = u;
            h.mat4 = v;
            h.quat4 = w; }
        return { glMatrixArrayType: k, MatrixArray: k, setMatrixArrayType: l, determineMatrixArrayType: m, glMath: j, vec2: y, vec3: n, vec4: aa, mat2: z, mat3: u, mat4: v, quat4: w }; })); }, null);
__d("degToRad", [], function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();

    function h(i) {
        return i * Math.PI / 180; }
    f.exports = h; }, null);
__d('getErrorNameFromWebGLErrorCode', [], function a(b, c, d, e, f, g) {
    if (c.__markCompiled) c.__markCompiled();
    var h = { '0': 'NO_ERROR', '1280': 'INVALID_ENUM', '1281': 'INVALID_VALUE', '1282': 'INVALID_OPERATION', '1285': 'OUT_OF_MEMORY', '1286': 'INVALID_FRAMEBUFFER_OPERATION', '37442': 'CONTEXT_LOST_WEBGL' };

    function i(j) {
        if (!(j in h)) return 'UNKNOWN_ERROR';
        return h[j]; }
    f.exports = i; }, null);
__d('SphericalRenderer', ['VideoProjection', 'GLMatrix', 'degToRad', 'getErrorNameFromWebGLErrorCode'], function a(b, c, d, e, f, g, h, i, j, k) {
    if (c.__markCompiled) c.__markCompiled();
    var l = i.mat4,
        m = window.devicePixelRatio || 1;

    function n(o, p, q) { 'use strict';
        this.$SphericalRenderer1 = null;
        this.$SphericalRenderer2 = q;
        this.$SphericalRenderer3 = null;
        this.$SphericalRenderer4 = null;
        this.$SphericalRenderer5 = null;
        this.$SphericalRenderer6 = q.fieldOfView;
        this.$SphericalRenderer7 = true;
        this.$SphericalRenderer8 = o;
        this.$SphericalRenderer9 = p;
        this.$SphericalRenderer10 = l.create();
        this.$SphericalRenderer11 = l.create();
        this.$SphericalRenderer12 = false;
        this.$SphericalRenderer13 = null;
        this.$SphericalRenderer14 = null;
        this.$SphericalRenderer15 = null;
        this.$SphericalRenderer9.addEventListener('webglcontextlost', function(r) {
            return this.$SphericalRenderer16(r); }.bind(this));
        this.$SphericalRenderer9.addEventListener('webglcontextrestored', function(r) {
            return this.$SphericalRenderer17(r); }.bind(this));
        this.$SphericalRenderer18(); }
    n.prototype.setErrorHandler = function(o) { 'use strict';
        this.$SphericalRenderer3 = o; };
    n.prototype.$SphericalRenderer16 = function(o) { 'use strict';
        o.preventDefault();
        this.$SphericalRenderer12 = true; };
    n.prototype.$SphericalRenderer17 = function(o) { 'use strict';
        this.$SphericalRenderer12 = false;
        this.$SphericalRenderer18(); };
    n.prototype.setAutoUpdateTexture = function(o) { 'use strict';
        this.$SphericalRenderer7 = o; };
    n.prototype.updateFieldOfView = function(o) { 'use strict';
        this.$SphericalRenderer6 = o;
        this.$SphericalRenderer19(); };
    n.prototype.updateViewportDimensions = function(o, p) { 'use strict';
        this.$SphericalRenderer9.width = o * m;
        this.$SphericalRenderer9.height = p * m;
        this.$SphericalRenderer19(); };
    n.prototype.$SphericalRenderer19 = function() { 'use strict';
        l.perspective(this.$SphericalRenderer6, this.$SphericalRenderer9.width / this.$SphericalRenderer9.height, .1, 100, this.$SphericalRenderer10);
        this.$SphericalRenderer1.viewport(0, 0, this.$SphericalRenderer1.drawingBufferWidth, this.$SphericalRenderer1.drawingBufferHeight); };
    n.prototype.$SphericalRenderer18 = function() { 'use strict';
        this.$SphericalRenderer20();
        this.updateViewportDimensions(this.$SphericalRenderer9.clientWidth, this.$SphericalRenderer9.clientHeight);
        if (!this.$SphericalRenderer21()) throw new Error('Failed to intialize shaders: ' + k(this.$SphericalRenderer1.getError()));
        if (this.$SphericalRenderer2.projectionType == h.CUBEMAP) { this.$SphericalRenderer22(this.$SphericalRenderer2.expansionCoef); } else this.$SphericalRenderer23();
        this.$SphericalRenderer24();
        this.$SphericalRenderer1.clearColor(0, 0, 0, 1);
        this.$SphericalRenderer8.setAttribute('crossorigin', 'anonymous'); };
    n.prototype.$SphericalRenderer20 = function() { 'use strict';
        if (typeof b.WebGLRenderingContext !== 'function') throw new Error('WebGLRenderingContext not available.');
        var o = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'],
            p = null,
            q = null,
            r = Event.listen(this.$SphericalRenderer9, 'webglcontextcreationerror', function(u) {
                return q = u.statusMessage; });
        for (var s = 0; s < o.length; s++) {
            try { p = this.$SphericalRenderer9.getContext(o[s]); } catch (t) {}
            if (p) break; }
        r.remove();
        this.$SphericalRenderer1 = p;
        if (!this.$SphericalRenderer1) {
            if (!q) q = 'Unknown error.';
            throw new Error('Failed to acquire 3D rendering context: ' + q); } };
    n.prototype.$SphericalRenderer21 = function() { 'use strict';
        var o = this.$SphericalRenderer25();
        if (!o) return false;
        var p = this.$SphericalRenderer26();
        if (!p) return false;
        this.$SphericalRenderer4 = this.$SphericalRenderer1.createProgram();
        this.$SphericalRenderer1.attachShader(this.$SphericalRenderer4, o);
        this.$SphericalRenderer1.attachShader(this.$SphericalRenderer4, p);
        this.$SphericalRenderer1.linkProgram(this.$SphericalRenderer4);
        if (!this.$SphericalRenderer1.getProgramParameter(this.$SphericalRenderer4, this.$SphericalRenderer1.LINK_STATUS)) return false;
        this.$SphericalRenderer1.useProgram(this.$SphericalRenderer4);
        this.$SphericalRenderer4.vertexPositionAttribute = this.$SphericalRenderer1.getAttribLocation(this.$SphericalRenderer4, 'aVertexPosition');
        this.$SphericalRenderer1.enableVertexAttribArray(this.$SphericalRenderer4.vertexPositionAttribute);
        this.$SphericalRenderer4.textureCoordAttribute = this.$SphericalRenderer1.getAttribLocation(this.$SphericalRenderer4, 'aTextureCoord');
        this.$SphericalRenderer1.enableVertexAttribArray(this.$SphericalRenderer4.textureCoordAttribute);
        this.$SphericalRenderer4.pMatrixUniform = this.$SphericalRenderer1.getUniformLocation(this.$SphericalRenderer4, 'uPMatrix');
        this.$SphericalRenderer4.mvMatrixUniform = this.$SphericalRenderer1.getUniformLocation(this.$SphericalRenderer4, 'uMVMatrix');
        this.$SphericalRenderer4.samplerUniform = this.$SphericalRenderer1.getUniformLocation(this.$SphericalRenderer4, 'uSampler');
        return true; };
    n.prototype.$SphericalRenderer24 = function() { 'use strict';
        this.$SphericalRenderer5 = this.$SphericalRenderer1.createTexture();
        this.$SphericalRenderer5.image = this.$SphericalRenderer8;
        this.$SphericalRenderer1.bindTexture(this.$SphericalRenderer1.TEXTURE_2D, this.$SphericalRenderer5);
        this.$SphericalRenderer1.texParameteri(this.$SphericalRenderer1.TEXTURE_2D, this.$SphericalRenderer1.TEXTURE_MAG_FILTER, this.$SphericalRenderer1.LINEAR);
        this.$SphericalRenderer1.texParameteri(this.$SphericalRenderer1.TEXTURE_2D, this.$SphericalRenderer1.TEXTURE_MIN_FILTER, this.$SphericalRenderer1.LINEAR);
        this.$SphericalRenderer1.texParameteri(this.$SphericalRenderer1.TEXTURE_2D, this.$SphericalRenderer1.TEXTURE_WRAP_S, this.$SphericalRenderer1.CLAMP_TO_EDGE);
        this.$SphericalRenderer1.texParameteri(this.$SphericalRenderer1.TEXTURE_2D, this.$SphericalRenderer1.TEXTURE_WRAP_T, this.$SphericalRenderer1.CLAMP_TO_EDGE);
        this.$SphericalRenderer1.bindTexture(this.$SphericalRenderer1.TEXTURE_2D, null); };
    n.prototype.$SphericalRenderer23 = function() { 'use strict';
        var o = 30,
            p = 30,
            q = 2,
            r = [],
            s = [],
            t, u;
        for (t = 0; t <= o; t++) {
            var v = (t / o - .5) * Math.PI,
                w = Math.sin(v),
                x = Math.cos(v);
            for (u = 0; u <= p; u++) {
                var y = (u / p - .5) * 2 * Math.PI,
                    z = Math.sin(y),
                    aa = Math.cos(y),
                    ba = aa * x,
                    ca = w,
                    da = z * x,
                    ea = u / p,
                    fa = t / o;
                s.push(ea);
                s.push(fa);
                r.push(q * ba);
                r.push(q * ca);
                r.push(q * da); } }
        var ga = [];
        for (t = 0; t < o; t++)
            for (u = 0; u < p; u++) {
                var ha = t * (p + 1) + u,
                    ia = ha + p + 1;
                ga.push(ha);
                ga.push(ia);
                ga.push(ha + 1);
                ga.push(ia);
                ga.push(ia + 1);
                ga.push(ha + 1); }
        this.$SphericalRenderer13 = this.$SphericalRenderer1.createBuffer();
        this.$SphericalRenderer1.bindBuffer(this.$SphericalRenderer1.ARRAY_BUFFER, this.$SphericalRenderer13);
        this.$SphericalRenderer1.bufferData(this.$SphericalRenderer1.ARRAY_BUFFER, new Float32Array(s), this.$SphericalRenderer1.STATIC_DRAW);
        this.$SphericalRenderer13.itemSize = 2;
        this.$SphericalRenderer13.numItems = s.length / 2;
        this.$SphericalRenderer14 = this.$SphericalRenderer1.createBuffer();
        this.$SphericalRenderer1.bindBuffer(this.$SphericalRenderer1.ARRAY_BUFFER, this.$SphericalRenderer14);
        this.$SphericalRenderer1.bufferData(this.$SphericalRenderer1.ARRAY_BUFFER, new Float32Array(r), this.$SphericalRenderer1.STATIC_DRAW);
        this.$SphericalRenderer14.itemSize = 3;
        this.$SphericalRenderer14.numItems = r.length / 3;
        this.$SphericalRenderer15 = this.$SphericalRenderer1.createBuffer();
        this.$SphericalRenderer1.bindBuffer(this.$SphericalRenderer1.ELEMENT_ARRAY_BUFFER, this.$SphericalRenderer15);
        this.$SphericalRenderer1.bufferData(this.$SphericalRenderer1.ELEMENT_ARRAY_BUFFER, new Uint16Array(ga), this.$SphericalRenderer1.STATIC_DRAW);
        this.$SphericalRenderer15.itemSize = 1;
        this.$SphericalRenderer15.numItems = ga.length; };
    n.prototype.$SphericalRenderer22 = function(o) { 'use strict';
        var p = 2,
            q = 3,
            r = [5, 1, 3, 7, 0, 4, 6, 2, 6, 7, 3, 2, 0, 1, 5, 4, 4, 5, 7, 6, 1, 0, 2, 3],
            s = [];
        for (var t = 0; t < r.length; t++) {
            var u = r[t] >> 2 & 1,
                v = r[t] >> 1 & 1,
                w = r[t] >> 0 & 1;
            s.push(u * 2 - 1);
            s.push(v * 2 - 1);
            s.push(w * 2 - 1); }
        this.$SphericalRenderer14 = this.$SphericalRenderer1.createBuffer();
        this.$SphericalRenderer1.bindBuffer(this.$SphericalRenderer1.ARRAY_BUFFER, this.$SphericalRenderer14);
        this.$SphericalRenderer1.bufferData(this.$SphericalRenderer1.ARRAY_BUFFER, new Float32Array(s), this.$SphericalRenderer1.STATIC_DRAW);
        this.$SphericalRenderer14.itemSize = 3;
        this.$SphericalRenderer14.numItems = s.length / 3;
        var x = [],
            y = 1 / q,
            z = 1 / p,
            aa = (o - 1) / 2;
        for (var ba = 0; ba < p; ++ba)
            for (var ca = 0; ca < q; ++ca) {
                var da = p - 1 - ba,
                    ea = ca;
                x.push((ea + aa) * y);
                x.push((da + aa) * z);
                x.push((ea + 1 - aa) * y);
                x.push((da + aa) * z);
                x.push((ea + 1 - aa) * y);
                x.push((da + 1 - aa) * z);
                x.push((ea + aa) * y);
                x.push((da + 1 - aa) * z); }
        this.$SphericalRenderer13 = this.$SphericalRenderer1.createBuffer();
        this.$SphericalRenderer1.bindBuffer(this.$SphericalRenderer1.ARRAY_BUFFER, this.$SphericalRenderer13);
        this.$SphericalRenderer1.bufferData(this.$SphericalRenderer1.ARRAY_BUFFER, new Float32Array(x), this.$SphericalRenderer1.STATIC_DRAW);
        this.$SphericalRenderer13.itemSize = 2;
        this.$SphericalRenderer13.numItems = x.length / 2;
        var fa = [];
        for (var ga = 0; ga < r.length; ga += 4) { fa.push(ga);
            fa.push(ga + 2);
            fa.push(ga + 1);
            fa.push(ga);
            fa.push(ga + 3);
            fa.push(ga + 2); }
        this.$SphericalRenderer15 = this.$SphericalRenderer1.createBuffer();
        this.$SphericalRenderer1.bindBuffer(this.$SphericalRenderer1.ELEMENT_ARRAY_BUFFER, this.$SphericalRenderer15);
        this.$SphericalRenderer1.bufferData(this.$SphericalRenderer1.ELEMENT_ARRAY_BUFFER, new Uint16Array(fa), this.$SphericalRenderer1.STATIC_DRAW);
        this.$SphericalRenderer15.itemSize = 1;
        this.$SphericalRenderer15.numItems = fa.length; };
    n.prototype.$SphericalRenderer25 = function() { 'use strict';
        var o = this.$SphericalRenderer1.createShader(this.$SphericalRenderer1.VERTEX_SHADER),
            p = '\n      attribute vec3 aVertexPosition;\n      attribute vec2 aTextureCoord;\n\n      uniform mat4 uMVMatrix;\n      uniform mat4 uPMatrix;\n\n      varying highp vec2 vTextureCoord;\n\n      void main(void) {\n        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n        vTextureCoord = aTextureCoord;\n      }\n    ';
        this.$SphericalRenderer1.shaderSource(o, p);
        this.$SphericalRenderer1.compileShader(o);
        if (!this.$SphericalRenderer1.getShaderParameter(o, this.$SphericalRenderer1.COMPILE_STATUS)) return null;
        return o; };
    n.prototype.$SphericalRenderer26 = function() { 'use strict';
        var o = this.$SphericalRenderer1.createShader(this.$SphericalRenderer1.FRAGMENT_SHADER),
            p = '\n      varying highp vec2 vTextureCoord;\n\n      uniform sampler2D uSampler;\n\n      void main(void) {\n        gl_FragColor = texture2D(\n          uSampler,\n          vec2(vTextureCoord.s, vTextureCoord.t)\n        );\n      }\n    ';
        this.$SphericalRenderer1.shaderSource(o, p);
        this.$SphericalRenderer1.compileShader(o);
        if (!this.$SphericalRenderer1.getShaderParameter(o, this.$SphericalRenderer1.COMPILE_STATUS)) return null;
        return o; };
    n.prototype.$SphericalRenderer27 = function() { 'use strict';
        this.$SphericalRenderer1.bindTexture(this.$SphericalRenderer1.TEXTURE_2D, this.$SphericalRenderer5);
        this.$SphericalRenderer1.pixelStorei(this.$SphericalRenderer1.UNPACK_FLIP_Y_WEBGL, true);
        try { this.$SphericalRenderer1.texImage2D(this.$SphericalRenderer1.TEXTURE_2D, 0, this.$SphericalRenderer1.RGBA, this.$SphericalRenderer1.RGBA, this.$SphericalRenderer1.UNSIGNED_BYTE, this.$SphericalRenderer5.image); } catch (o) { this.$SphericalRenderer3 && this.$SphericalRenderer3(o); }
        this.$SphericalRenderer1.bindTexture(this.$SphericalRenderer1.TEXTURE_2D, null); };
    n.prototype.render = function(o, p) { 'use strict';
        if (this.$SphericalRenderer12) return;
        if (this.$SphericalRenderer7) this.$SphericalRenderer27();
        l.identity(this.$SphericalRenderer11);
        l.rotateX(this.$SphericalRenderer11, j(p));
        l.rotateY(this.$SphericalRenderer11, j(o + 90));
        this.$SphericalRenderer1.clear(this.$SphericalRenderer1.COLOR_BUFFER_BIT | this.$SphericalRenderer1.DEPTH_BUFFER_BIT);
        this.$SphericalRenderer1.activeTexture(this.$SphericalRenderer1.TEXTURE0);
        this.$SphericalRenderer1.bindTexture(this.$SphericalRenderer1.TEXTURE_2D, this.$SphericalRenderer5);
        this.$SphericalRenderer1.uniform1i(this.$SphericalRenderer4.samplerUniform, 0);
        this.$SphericalRenderer1.bindBuffer(this.$SphericalRenderer1.ARRAY_BUFFER, this.$SphericalRenderer14);
        this.$SphericalRenderer1.vertexAttribPointer(this.$SphericalRenderer4.vertexPositionAttribute, this.$SphericalRenderer14.itemSize, this.$SphericalRenderer1.FLOAT, false, 0, 0);
        this.$SphericalRenderer1.bindBuffer(this.$SphericalRenderer1.ARRAY_BUFFER, this.$SphericalRenderer13);
        this.$SphericalRenderer1.vertexAttribPointer(this.$SphericalRenderer4.textureCoordAttribute, this.$SphericalRenderer13.itemSize, this.$SphericalRenderer1.FLOAT, false, 0, 0);
        this.$SphericalRenderer1.bindBuffer(this.$SphericalRenderer1.ELEMENT_ARRAY_BUFFER, this.$SphericalRenderer15);
        this.$SphericalRenderer1.uniformMatrix4fv(this.$SphericalRenderer4.pMatrixUniform, false, this.$SphericalRenderer10);
        this.$SphericalRenderer1.uniformMatrix4fv(this.$SphericalRenderer4.mvMatrixUniform, false, this.$SphericalRenderer11);
        this.$SphericalRenderer1.drawElements(this.$SphericalRenderer1.TRIANGLES, this.$SphericalRenderer15.numItems, this.$SphericalRenderer1.UNSIGNED_SHORT, 0);
        this.$SphericalRenderer1.bindTexture(this.$SphericalRenderer1.TEXTURE_2D, null); };
    f.exports = n; }, null);
__d('SphericalViewportControl', ['Event', 'EventEmitter', 'CSS', 'DOMQuery', 'SubscriptionsHandler', 'VelocityTracker', 'cx', 'getElementRect', 'performanceNow', 'requestAnimationFrame', 'throttle', 'Keys'], function a(b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
    var t, u;
    if (c.__markCompiled) c.__markCompiled();
    var v = k.scry(window.document.body, '#globalContainer')[0] || window.document.body,
        w = ['W', 'A', 'S', 'D'].reduce(function(z, aa) { z[aa] = aa.charCodeAt(0);
            return z; }, {}),
        x = { Up: "__tu", Down: "__tz", Left: "_2a6u", Right: "_2a6v", UpLeft: "__t-", UpRight: "__u0", DownLeft: "__u1", DownRight: "__u3" };
    t = babelHelpers.inherits(y, i);
    u = t && t.prototype;

    function y(z, aa) { 'use strict';
        u.constructor.call(this);
        this.$sphericalViewportControl1 = new m(300);
        this.$sphericalViewportControl2 = new m(300);
        this.$sphericalViewportControl3 = aa.fieldOfView;
        this.$sphericalViewportControl4 = new l();
        this.$sphericalViewportControl7 = aa.keyboardVelocityFactor * 1000 || 80;
        this.$sphericalViewportControl16 = aa.panningVelocityFactor / 15 * 80 || 80;
        this.$sphericalViewportControl8 = { left: 0, right: 0, up: 0, down: 0 };
        this.$sphericalViewportControl11 = { x: 0, y: 0 };
        this.$sphericalViewportControl12 = { x: 0, y: 0 };
        this.$sphericalViewportControl14 = new m();
        this.$sphericalViewportControl15 = { x: aa.initialHeading, y: aa.initialPitch };
        this.$sphericalViewportControl17 = new l();
        this.$sphericalViewportControl18 = z;
        this.$sphericalViewportControl17.addSubscriptions(h.listen(this.$sphericalViewportControl18, 'mousedown', function(ba) {
            return this.$sphericalViewportControl20(ba); }.bind(this)), h.listen(this.$sphericalViewportControl18, 'mouseenter', function(ba) {
            return this.$sphericalViewportControl21(ba); }.bind(this)), h.listen(this.$sphericalViewportControl18, 'mouseleave', function(ba) {
            return this.$sphericalViewportControl22(ba); }.bind(this)), h.listen(this.$sphericalViewportControl18, 'click', function(ba) {
            return this.$sphericalViewportControl23(ba); }.bind(this)), h.listen(this.$sphericalViewportControl18, 'wheel', function(ba) {
            return this.$sphericalViewportControl24(ba); }.bind(this)), h.listen(this.$sphericalViewportControl18, 'keydown', function(ba) {
            return this.$sphericalViewportControl25(ba); }.bind(this)), h.listen(this.$sphericalViewportControl18, 'keyup', function(ba) {
            return this.$sphericalViewportControl26(ba); }.bind(this)), h.listen(this.$sphericalViewportControl18, 'blur', function(ba) {
            return this.$sphericalViewportControl27(ba); }.bind(this))); }
    y.prototype.$sphericalViewportControl20 = function(z) { 'use strict';
        this.$sphericalViewportControl28(z);
        this.$sphericalViewportControl29(z);
        this.$sphericalViewportControl30();
        h.kill(z); };
    y.prototype.$sphericalViewportControl21 = function(z) { 'use strict';
        if (this.$sphericalViewportControl13) this.$sphericalViewportControl2 = new m(300); };
    y.prototype.$sphericalViewportControl22 = function(z) { 'use strict';
        if (this.$sphericalViewportControl13) {
            var aa = this.$sphericalViewportControl31();
            this.$sphericalViewportControl2 = new m(300, aa); } };
    y.prototype.$sphericalViewportControl32 = function(z) { 'use strict';
        if (this.$sphericalViewportControl13) this.$sphericalViewportControl33(); };
    y.prototype.$sphericalViewportControl34 = function(z) { 'use strict';
        this.$sphericalViewportControl29(z);
        this.$sphericalViewportControl5 = true; };
    y.prototype.$sphericalViewportControl35 = function(z) { 'use strict';
        this.$sphericalViewportControl29(z);
        this.$sphericalViewportControl33();
        this.$sphericalViewportControl36();
        h.kill(z); };
    y.prototype.$sphericalViewportControl23 = function(z) { 'use strict';
        this.$sphericalViewportControl18.focus();
        if (!this.$sphericalViewportControl5) this.emit('DOM/click', z);
        this.$sphericalViewportControl5 = false; };
    y.prototype.$sphericalViewportControl24 = function(z) { 'use strict';
        z.preventDefault();
        r(this.emit, 100, this)('wheelScroll', z); };
    y.prototype.$sphericalViewportControl25 = function(z) { 'use strict';
        var aa = this.$sphericalViewportControl37(z);
        if (aa) { this.$sphericalViewportControl8[aa] = 1;
            if (!this.$sphericalViewportControl9) { this.$sphericalViewportControl9 = true;
                this.$sphericalViewportControl30(); }
            return false; } };
    y.prototype.$sphericalViewportControl26 = function(z) { 'use strict';
        var aa = this.$sphericalViewportControl37(z);
        if (aa) { this.$sphericalViewportControl8[aa] = 0;
            var ba = false;
            for (var ca in this.$sphericalViewportControl8)
                if (this.$sphericalViewportControl8.hasOwnProperty(ca) && this.$sphericalViewportControl8[ca] > 0) { ba = true;
                    break; }
            this.$sphericalViewportControl9 = ba;
            return false; } };
    y.prototype.$sphericalViewportControl36 = function() { 'use strict';
        var z = this.$sphericalViewportControl31();
        this.$sphericalViewportControl1 = new m(300, z); };
    y.prototype.$sphericalViewportControl31 = function() { 'use strict';
        var z = this.$sphericalViewportControl38(),
            aa = -this.$sphericalViewportControl14.getVelocityX() * z,
            ba = -this.$sphericalViewportControl14.getVelocityY() * z;
        return { x: aa, y: ba }; };
    y.prototype.$sphericalViewportControl30 = function() { 'use strict';
        if (!this.$sphericalViewportControl6) { this.$sphericalViewportControl6 = true;
            this.$sphericalViewportControl1.updateVelocity(0, 0);
            this.emit('updateViewportBegin');
            q(function() {
                return this.$sphericalViewportControl39(p()); }.bind(this)); } };
    y.prototype.$sphericalViewportControl39 = function(z) { 'use strict';
        var aa = p(),
            ba = aa - z;
        this.$sphericalViewportControl40();
        var ca = this.$sphericalViewportControl41();
        ca.x += this.$sphericalViewportControl1.getVelocityX() * ba / 1000;
        ca.y += this.$sphericalViewportControl1.getVelocityY() * ba / 1000;
        ca.x += this.$sphericalViewportControl2.getVelocityX() * ba / 1000;
        ca.y += this.$sphericalViewportControl2.getVelocityY() * ba / 1000;
        this.$sphericalViewportControl42(ca.x, ca.y);
        var da = this.$sphericalViewportControl1.getSpeed() > 0 || this.$sphericalViewportControl2.getSpeed() > 0;
        if (this.$sphericalViewportControl13 || this.$sphericalViewportControl9 || da) { q(function() {
                return this.$sphericalViewportControl39(aa); }.bind(this)); } else { this.$sphericalViewportControl6 = false;
            this.emit('updateViewportEnd'); } };
    y.prototype.$sphericalViewportControl43 = function(z, aa, ba, ca) { 'use strict';
        var da = '';
        if (z || aa || ba || ca) {
            var ea = z ? 'Left' : aa ? 'Right' : '',
                fa = ba ? 'Up' : ca ? 'Down' : '';
            da = x[fa + ea]; }
        if (this.$sphericalViewportControl19 != da) {
            if (this.$sphericalViewportControl19) { j.removeClass(v, this.$sphericalViewportControl19);
                this.$sphericalViewportControl19 = ''; }
            if (da) { this.$sphericalViewportControl19 = da;
                j.addClass(v, da); } } };
    y.prototype.$sphericalViewportControl28 = function(z) { 'use strict';
        this.$sphericalViewportControl11 = { x: z.screenX, y: z.screenY };
        this.$sphericalViewportControl10 = { x: 0, y: 0 };
        this.$sphericalViewportControl13 = true;
        this.$sphericalViewportControl14 = new m();
        j.addClass(v, "_2a6t");
        j.addClass(this.$sphericalViewportControl18, "_2a6t");
        this.$sphericalViewportControl4.engage();
        var aa = b.document.body;
        this.$sphericalViewportControl4.addSubscriptions(h.listen(aa, 'mousemove', function(ba) {
            return this.$sphericalViewportControl34(ba); }.bind(this)), h.listen(aa, 'mouseup', function(ba) {
            return this.$sphericalViewportControl35(ba); }.bind(this)), h.listen(aa, 'mouseleave', function(ba) {
            return this.$sphericalViewportControl32(ba); }.bind(this))); };
    y.prototype.$sphericalViewportControl33 = function() { 'use strict';
        j.removeClass(v, "_2a6t");
        j.removeClass(this.$sphericalViewportControl18, "_2a6t");
        this.$sphericalViewportControl13 = false;
        this.$sphericalViewportControl4.release();
        if (this.$sphericalViewportControl19) { j.removeClass(v, this.$sphericalViewportControl19);
            this.$sphericalViewportControl19 = ''; } };
    y.prototype.$sphericalViewportControl29 = function(z) { 'use strict';
        this.$sphericalViewportControl10 = { x: z.screenX - this.$sphericalViewportControl11.x, y: z.screenY - this.$sphericalViewportControl11.y };
        this.$sphericalViewportControl11 = { x: z.screenX, y: z.screenY };
        this.$sphericalViewportControl14.update(z.screenX, z.screenY);
        this.$sphericalViewportControl12 = { x: z.clientX, y: z.clientY }; };
    y.prototype.getSubscriptions = function() { 'use strict';
        return { remove: function() { this.$sphericalViewportControl17.release();
                this.$sphericalViewportControl4.release(); }.bind(this) }; };
    y.prototype.$sphericalViewportControl27 = function(z) { 'use strict';
        for (var aa in this.$sphericalViewportControl8) this.$sphericalViewportControl8[aa] = 0;
        this.$sphericalViewportControl9 = false; };
    y.prototype.getOrientation = function() { 'use strict';
        return this.$sphericalViewportControl15; };
    y.prototype.setOrientation = function(z, aa) { 'use strict';
        z = (z + 360) % 360;
        aa = Math.max(-90, Math.min(90, aa));
        var ba = z != this.$sphericalViewportControl15.x || aa != this.$sphericalViewportControl15.y;
        this.$sphericalViewportControl15 = { x: z, y: aa };
        if (ba) this.emit('viewportChange', z, aa); };
    y.prototype.$sphericalViewportControl42 = function(z, aa) { 'use strict';
        this.setOrientation(this.$sphericalViewportControl15.x + z, this.$sphericalViewportControl15.y + aa); };
    y.prototype.setFieldOfView = function(z) { 'use strict';
        this.$sphericalViewportControl3 = z; };
    y.prototype.$sphericalViewportControl40 = function() { 'use strict';
        var z = this.$sphericalViewportControl7 * (-this.$sphericalViewportControl8.left + this.$sphericalViewportControl8.right),
            aa = this.$sphericalViewportControl7 * (-this.$sphericalViewportControl8.up + this.$sphericalViewportControl8.down);
        this.$sphericalViewportControl1.updateVelocity(z, aa); };
    y.prototype.$sphericalViewportControl41 = function() { 'use strict';
        var z = 0,
            aa = 0,
            ba = { x: 0, y: 0 };
        if (this.$sphericalViewportControl13) {
            var ca = o(this.$sphericalViewportControl18),
                da = this.$sphericalViewportControl12.x < ca.left,
                ea = this.$sphericalViewportControl12.x > ca.right,
                fa = this.$sphericalViewportControl12.y < ca.top,
                ga = this.$sphericalViewportControl12.y > ca.bottom;
            this.$sphericalViewportControl43(da, ea, fa, ga);
            var ha = this.$sphericalViewportControl38();
            if (!da && !ea) { ba.x = -this.$sphericalViewportControl10.x * ha;
                this.$sphericalViewportControl10.x = 0; } else {
                if (da) z += this.$sphericalViewportControl16;
                if (ea) z -= this.$sphericalViewportControl16; }
            if (!fa && !ga) { ba.y = -this.$sphericalViewportControl10.y * ha;
                this.$sphericalViewportControl10.y = 0; } else {
                if (fa) aa += this.$sphericalViewportControl16;
                if (ga) aa -= this.$sphericalViewportControl16; } }
        this.$sphericalViewportControl2.updateVelocity(z, aa);
        return ba; };
    y.prototype.$sphericalViewportControl37 = function(z) { 'use strict';
        var aa = h.getKeyCode(z),
            ba = null;
        switch (aa) {
            case s.LEFT:
            case w.A:
                ba = 'left';
                break;
            case s.UP:
            case w.W:
                ba = 'up';
                break;
            case s.RIGHT:
            case w.D:
                ba = 'right';
                break;
            case s.DOWN:
            case w.S:
                ba = 'down';
                break; }
        return ba; };
    y.prototype.$sphericalViewportControl38 = function() { 'use strict';
        return this.$sphericalViewportControl3 / this.$sphericalViewportControl18.clientHeight; };
    f.exports = y; }, null);
__d('VideoPlayerHTML5Spherical', ['Banzai', 'CSS', 'DOM', 'DOMDimensions', 'EventEmitter', 'Event', 'SphericalViewportControl', 'SubscriptionsHandler', 'SphericalRenderer', 'cx', 'requestAnimationFrame'], function a(b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
    var s, t;
    if (c.__markCompiled) c.__markCompiled();
    s = babelHelpers.inherits(u, l);
    t = s && s.prototype;

    function u(v, w) { 'use strict';
        t.constructor.call(this);
        this.$VideoPlayerHTML5Spherical1 = v;
        this.$VideoPlayerHTML5Spherical7 = Date.now();
        this.$VideoPlayerHTML5Spherical4 = 0;
        this.$VideoPlayerHTML5Spherical5 = false;
        this.$VideoPlayerHTML5Spherical8 = new o();
        this.$VideoPlayerHTML5Spherical3 = k.getElementDimensions(v);
        this.$VideoPlayerHTML5Spherical9 = w;
        this.$VideoPlayerHTML5Spherical6 = this.$VideoPlayerHTML5Spherical13.bind(this);
        this.$VideoPlayerHTML5Spherical8.addSubscriptions(m.listen(this.$VideoPlayerHTML5Spherical1, 'loadeddata', function() {
            return this.forceUpdateNextFrame(); }.bind(this)), m.listen(this.$VideoPlayerHTML5Spherical1, 'seeked', function() {
            return this.forceUpdateNextFrame(); }.bind(this)));
        i.hide(v);
        this.$VideoPlayerHTML5Spherical14(); }
    u.prototype.$VideoPlayerHTML5Spherical15 = function() { 'use strict';
        this.$VideoPlayerHTML5Spherical12 = true;
        this.$VideoPlayerHTML5Spherical2.remove();
        var v = function() { this.$VideoPlayerHTML5Spherical1.removeEventListener('play', v);
            this.$VideoPlayerHTML5Spherical14(); }.bind(this);
        this.$VideoPlayerHTML5Spherical1.addEventListener('play', v); };
    u.prototype.$VideoPlayerHTML5Spherical14 = function() { 'use strict';
        var v = j.create('canvas', { width: this.$VideoPlayerHTML5Spherical3.width, height: this.$VideoPlayerHTML5Spherical3.height, className: "_2a6s", tabIndex: 0 }),
            w = new p(this.$VideoPlayerHTML5Spherical1, v, this.$VideoPlayerHTML5Spherical9);
        w.setErrorHandler(this.$VideoPlayerHTML5Spherical16.bind(this));
        var x = new n(v, this.$VideoPlayerHTML5Spherical9);
        x.addListener('viewportChange', this.$VideoPlayerHTML5Spherical17.bind(this));
        var y = ['DOM/click', 'updateViewportBegin', 'updateViewportEnd', 'wheelScroll'];
        y.forEach(function(z) {
            return x.addListener(z, this.emit.bind(this, z)); }.bind(this));
        w.updateViewportDimensions(this.$VideoPlayerHTML5Spherical3.width, this.$VideoPlayerHTML5Spherical3.height);
        v.addEventListener('webglcontextlost', this.$VideoPlayerHTML5Spherical15.bind(this));
        this.$VideoPlayerHTML5Spherical11 = w;
        this.$VideoPlayerHTML5Spherical10 = x;
        this.$VideoPlayerHTML5Spherical2 = v;
        this.$VideoPlayerHTML5Spherical12 = false;
        j.insertAfter(this.$VideoPlayerHTML5Spherical1, v);
        i.show(v);
        r(this.$VideoPlayerHTML5Spherical6); };
    u.prototype.getSubscriptions = function() { 'use strict';
        return { remove: function() { this.$VideoPlayerHTML5Spherical8.release();
                this.$VideoPlayerHTML5Spherical10.getSubscriptions().remove(); }.bind(this) }; };
    u.prototype.$VideoPlayerHTML5Spherical16 = function(v) { 'use strict';
        this.$VideoPlayerHTML5Spherical1.pause();
        this.emit('error', { error: 'SPHERICAL_RENDER_ERROR', message: v.message }); };
    u.prototype.$VideoPlayerHTML5Spherical13 = function() { 'use strict';
        if (this.$VideoPlayerHTML5Spherical12) return;
        r(this.$VideoPlayerHTML5Spherical6);
        if (this.$VideoPlayerHTML5Spherical1.readyState >= this.$VideoPlayerHTML5Spherical1.HAVE_CURRENT_DATA) { this.$VideoPlayerHTML5Spherical4++;
            if (this.$VideoPlayerHTML5Spherical18() || this.$VideoPlayerHTML5Spherical5) {
                var v = this.$VideoPlayerHTML5Spherical10.getOrientation();
                this.$VideoPlayerHTML5Spherical11.render(v.x, v.y);
                this.$VideoPlayerHTML5Spherical5 = false; } } };
    u.prototype.$VideoPlayerHTML5Spherical18 = function() { 'use strict';
        return !(this.$VideoPlayerHTML5Spherical1.paused || this.$VideoPlayerHTML5Spherical1.ended); };
    u.prototype.freeze = function() { 'use strict';
        this.$VideoPlayerHTML5Spherical11.setAutoUpdateTexture(false); };
    u.prototype.unfreeze = function() { 'use strict';
        this.$VideoPlayerHTML5Spherical11.setAutoUpdateTexture(true); };
    u.prototype.setViewport = function(v, w) { 'use strict';
        this.$VideoPlayerHTML5Spherical10.setOrientation(v, w); };
    u.prototype.setFieldOfView = function(v) { 'use strict';
        this.$VideoPlayerHTML5Spherical11.updateFieldOfView(v);
        this.$VideoPlayerHTML5Spherical10.setFieldOfView(v);
        this.forceUpdateNextFrame(); };
    u.prototype.setDimensions = function(v, w) { 'use strict';
        if (!this.$VideoPlayerHTML5Spherical12) { this.$VideoPlayerHTML5Spherical11.updateViewportDimensions(v, w);
            this.forceUpdateNextFrame(); } };
    u.prototype.forceUpdateNextFrame = function() { 'use strict';
        this.$VideoPlayerHTML5Spherical5 = true; };
    u.prototype.$VideoPlayerHTML5Spherical17 = function(v, w, x) { 'use strict';
        this.$VideoPlayerHTML5Spherical19(v, w);
        this.emit('viewportChange', v, w, x);
        this.forceUpdateNextFrame(); };
    u.prototype.$VideoPlayerHTML5Spherical19 = function(v, w) { 'use strict';
        var x = Date.now();
        if (x - this.$VideoPlayerHTML5Spherical7 >= 1000) { this.$VideoPlayerHTML5Spherical7 = x;
            h.post('spherical_video_viewport', { video_fbid: this.$VideoPlayerHTML5Spherical9.videoID, yaw_degrees: v, pitch_degrees: w, roll_degrees: 0, field_of_view_y: this.$VideoPlayerHTML5Spherical9.fieldOfView, aspect_ratio: this.$VideoPlayerHTML5Spherical1.height / this.$VideoPlayerHTML5Spherical1.width, video_player_position: this.$VideoPlayerHTML5Spherical1.currentTime, timestamp: this.$VideoPlayerHTML5Spherical7 }); } };
    f.exports = u; }, null);
__d('VideoSphericalOverlay', ['cx', 'invariant', 'performanceNow', 'requestAnimationFrame', 'bezier', 'Event', 'CSS'], function a(b, c, d, e, f, g, h, i, j, k, l, m, n) {
    if (c.__markCompiled) c.__markCompiled();
    var o = [{ progress: 0, value: 0 }, { progress: .25, value: 30 }, { progress: .75, value: -30 }, { progress: 1, value: 0 }];

    function p(t, u, v) {!(t.length > 1) ? i(0): undefined;!(t[0].progress === 0) ? i(0): undefined;!(t[t.length - 1].progress === 1) ? i(0): undefined;
        var w = 0;
        return function x(y) {
            var z = y / u,
                aa = w;
            if (z >= 1) { w = t.length - 1;
                return t[t.length - 1].value; }
            if (z <= 0) { w = 0;
                return t[0].value; }
            while (t[aa].progress < z) aa++;
            while (t[aa - 1].progress > z) aa--;
            w = aa;
            var ba = t[aa - 1].value,
                ca = t[aa].value,
                da = z - t[aa - 1].progress,
                ea = t[aa].progress - t[aa - 1].progress,
                fa = da / ea;
            return (ba + v(fa) * (ca - ba)); }; }
    var q = 8000,
        r = p(o, q, l(.25, .1, .25, 1, 1000 / 60 / q / 4));

    function s(t, u) { 'use strict';
        this.$VideoSphericalOverlay1 = true;
        this.$VideoSphericalOverlay2 = u;
        this.$VideoSphericalOverlay5 = t;
        t.addListener('beginPlayback', function() {
            return this.$VideoSphericalOverlay6(); }.bind(this));
        t.addListener('pausePlayback', function() {
            return this.$VideoSphericalOverlay7(); }.bind(this));
        t.addListener('updateViewportBegin', function() {
            return this.$VideoSphericalOverlay7(); }.bind(this));
        t.addListener('clickVideo', function() {
            return this.$VideoSphericalOverlay7(); }.bind(this));
        t.addListener('stateChange', function() {
            return this.$VideoSphericalOverlay8(); }.bind(this));
        m.listen(u, 'animationend', function() {
            return this.$VideoSphericalOverlay9(); }.bind(this)); }
    s.prototype.$VideoSphericalOverlay10 = function() { 'use strict';
        this.$VideoSphericalOverlay3 = true;
        this.$VideoSphericalOverlay4 = j();
        n.addClass(this.$VideoSphericalOverlay5.getRootNode(), "_2dz6");
        n.addClass(this.$VideoSphericalOverlay2, "_2dz7");
        k(function() {
            return this.$VideoSphericalOverlay11(); }.bind(this)); };
    s.prototype.$VideoSphericalOverlay7 = function() { 'use strict';
        this.$VideoSphericalOverlay3 = false;
        n.removeClass(this.$VideoSphericalOverlay5.getRootNode(), "_2dz6");
        n.removeClass(this.$VideoSphericalOverlay2, "_2dz7"); };
    s.prototype.$VideoSphericalOverlay8 = function() { 'use strict';
        if (this.$VideoSphericalOverlay5.isState('fallback')) { this.$VideoSphericalOverlay1 = false;
            this.$VideoSphericalOverlay7(); } };
    s.prototype.$VideoSphericalOverlay6 = function() { 'use strict';
        if (this.$VideoSphericalOverlay1) { this.$VideoSphericalOverlay1 = false;
            this.$VideoSphericalOverlay10(); } };
    s.prototype.$VideoSphericalOverlay11 = function() { 'use strict';
        if (!this.$VideoSphericalOverlay3) return;
        var t = j() - this.$VideoSphericalOverlay4,
            u = r(t);
        this.$VideoSphericalOverlay5.setSphericalViewport(u, 0);
        k(function() {
            return this.$VideoSphericalOverlay11(); }.bind(this)); };
    s.prototype.$VideoSphericalOverlay9 = function() { 'use strict';
        this.$VideoSphericalOverlay7(); };
    f.exports = s; }, null);
__d('VideoWithSphericalErrorMessage', ['fbt'], function a(b, c, d, e, f, g, h) {
    if (c.__markCompiled) c.__markCompiled();

    function i(j) { 'use strict';
        this.$VideoWithSphericalErrorMessage1 = j;
        this.$VideoWithSphericalErrorMessage2 = j.addListener('optionsChange', function() {
            return this.$VideoWithSphericalErrorMessage3(); }.bind(this));
        this.$VideoWithSphericalErrorMessage3(); }
    i.prototype.$VideoWithSphericalErrorMessage4 = function(j, k) { 'use strict';
        this.$VideoWithSphericalErrorMessage1.setOption('VideoErrorOverlay', j, k); };
    i.prototype.$VideoWithSphericalErrorMessage3 = function() { 'use strict';
        if (this.$VideoWithSphericalErrorMessage1.getOption('VideoErrorOverlay', 'available')) { this.$VideoWithSphericalErrorMessage4('title', h._("360 Video \u4e0d\u53ef\u7528"));
            this.$VideoWithSphericalErrorMessage4('message', h._("\u89c6\u9891\u65e0\u6cd5\u5728\u8fd9\u4e2a\u6d4f\u89c8\u5668\u4e2d\u64ad\u653e"));
            this.$VideoWithSphericalErrorMessage4('linkURL', 'https://www.facebook.com/help/851697264925946');
            this.$VideoWithSphericalErrorMessage4('linkTitle', h._("\u70b9\u51fb\u8be6\u7ec6\u4e86\u89e3"));
            this.$VideoWithSphericalErrorMessage2.remove(); } };
    f.exports = i; }, null);
