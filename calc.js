(function (root) {
  const F = {};

  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a || 1; }
  function Frac(n, d) {
    if (d == null) d = 1;
    if (!Number.isInteger(n) || !Number.isInteger(d)) throw new Error('Coefficients must be integers');
    if (d === 0) throw new Error('Zero denominator');
    if (d < 0) { n = -n; d = -d; }
    const g = gcd(n, d);
    this.n = n / g; this.d = d / g;
  }
  Frac.prototype.add = function (o) { return new Frac(this.n * o.d + o.n * this.d, this.d * o.d); };
  Frac.prototype.mul = function (o) { return new Frac(this.n * o.n, this.d * o.d); };
  Frac.prototype.eq = function (o) { return this.n === o.n && this.d === o.d; };
  Frac.prototype.isZero = function () { return this.n === 0; };
  Frac.prototype.toString = function () { return this.d === 1 ? String(this.n) : (this.n + '/' + this.d); };
  function N(x) { return x instanceof Frac ? x : new Frac(x, 1); }
  function num(v, name) {
    const x = Number(String(v).trim() === '' ? 0 : v);
    if (!Number.isInteger(x)) throw new Error(name + ' must be an integer (blank counts as 0)');
    return new Frac(x, 1);
  }
  F.num = num;
  // M = a00 + a10 x + a01 y + a20 x^2 + a11 x y + a02 y^2
  // N = b00 + b10 x + b01 y + b20 x^2 + b11 x y + b02 y^2
  F.exact = function (a, b) {
    const My = { c: a.a01, x: a.a11, y: a.a02.mul(N(2)) };
    const Nx = { c: b.b10, x: b.b20.mul(N(2)), y: b.b11 };
    const exact = My.c.eq(Nx.c) && My.x.eq(Nx.x) && My.y.eq(Nx.y);
    const term = (coef, mon) => {
      if (coef.isZero()) return null;
      const s = coef.toString();
      if (mon === '1') return s;
      if (s === '1') return mon;
      if (s === '-1') return '-' + mon;
      return s + mon;
    };
    const join = parts => {
      const p = parts.filter(Boolean);
      if (!p.length) return '0';
      return p.reduce((acc, t) => acc + (t[0] === '-' ? ' - ' + t.slice(1) : ' + ' + t));
    };
    // F = a00 x + a10 x^2/2 + a01 x y + a20 x^3/3 + a11 x^2 y / 2 + a02 x y^2 + g(y)
    // g'(y) = b00 + b01 y + b02 y^2
    const Fterms = [];
    const push = (coef, mon) => { const t = term(coef, mon); if (t) Fterms.push(t); };
    push(a.a20.mul(new Frac(1, 3)), 'x^3');
    push(a.a11.mul(new Frac(1, 2)), 'x^2 y');
    push(a.a10.mul(new Frac(1, 2)), 'x^2');
    push(a.a02, 'x y^2');
    push(a.a01, 'xy');
    push(a.a00, 'x');
    push(b.b02.mul(new Frac(1, 3)), 'y^3');
    push(b.b01.mul(new Frac(1, 2)), 'y^2');
    push(b.b00, 'y');
    return {
      exact,
      My: { c: My.c.toString(), x: My.x.toString(), y: My.y.toString() },
      Nx: { c: Nx.c.toString(), x: Nx.x.toString(), y: Nx.y.toString() },
      potential: join(Fterms)
    };
  };
  F.format = function (r) {
    const poly = (c, x, y, vars) => {
      // display My or Nx as c + x*x + y*y
      const parts = [];
      const add = (coef, mon) => {
        if (coef === '0') return;
        if (mon === '1') parts.push(coef);
        else if (coef === '1') parts.push(mon);
        else if (coef === '-1') parts.push('-' + mon);
        else parts.push(coef + mon);
      };
      add(c, '1'); add(x, 'x'); add(y, 'y');
      if (!parts.length) return '0';
      return parts.reduce((acc, t) => acc + (t[0] === '-' ? ' - ' + t.slice(1) : ' + ' + t));
    };
    let out = 'My = ' + poly(r.My.c, r.My.x, r.My.y) + '\nNx = ' + poly(r.Nx.c, r.Nx.x, r.Nx.y) + '\n';
    if (!r.exact) {
      out += 'Not exact: My is not identically equal to Nx.\nDo not write a potential function. Look for an integrating factor, or use another first-order method from your syllabus.';
      return out;
    }
    out += 'Exact, because My = Nx identically.\nImplicit solution: ' + r.potential + ' = C\n';
    out += 'Write the check My = Nx first, then integrate M with respect to x (y constant) and fix the leftover function of y from F_y = N.';
    return out;
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = F;
  else root.F = F;
})(typeof globalThis !== 'undefined' ? globalThis : this);
