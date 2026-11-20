const F = require('./calc.js');
const eq = (x, y, msg) => {
  if (JSON.stringify(x) !== JSON.stringify(y)) throw Error((msg ? msg + ': ' : '') + JSON.stringify(x) + ' vs ' + JSON.stringify(y));
};
function coeffs(M, N) {
  const z = {a00:0,a10:0,a01:0,a20:0,a11:0,a02:0,b00:0,b10:0,b01:0,b20:0,b11:0,b02:0};
  Object.assign(z, M, N);
  const a = {}, b = {};
  for (const k of ['a00','a10','a01','a20','a11','a02']) a[k] = F.num(z[k], k);
  for (const k of ['b00','b10','b01','b20','b11','b02']) b[k] = F.num(z[k], k);
  return F.exact(a, b);
}
let r = coeffs({a10:2,a01:1},{b10:1,b01:2});
eq(r.exact, true, 'exact 1');
eq(r.potential, 'x^2 + xy + y^2', 'F1');

r = coeffs({a20:3,a01:2},{b10:2,b01:4});
eq(r.exact, true, 'exact 2');
eq(r.potential, 'x^3 + 2xy + 2y^2', 'F2');

r = coeffs({a10:2,a01:1},{b10:2,b01:2});
eq(r.exact, false, 'not exact');

// (y) dx + (x) dy already covered; (2xy + y^2) dx + (x^2 + 2xy) dy
r = coeffs({a11:2,a02:1},{b20:1,b11:2});
eq(r.exact, true, 'exact 3');
eq(r.potential, 'x^2 y + x y^2', 'F3');

const throws = (fn) => { try { fn(); } catch (e) { return; } throw Error('expected an error'); };
throws(() => F.num('1.5', 'a10'));

console.log('All checks passed');
