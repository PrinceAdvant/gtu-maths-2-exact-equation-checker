# GTU Maths 2 exact differential equation checker: My = Nx, then the implicit solution F = C

GTU Hero's Maths 2 guide lists exact differential equations among the first-order methods to practise for BE Mathematics 2, next to other solution methods and initial-value problems where they are prescribed. Ye page My aur Nx compare karta hai for a quadratic M dx + N dy = 0. If the equation is exact, it writes the implicit solution with exact fractions. Practice coefficients are my own, not from a GTU paper. Pehle My = Nx likho, phir integrate karna.

Live page: https://princeadvant.github.io/gtu-maths-2-exact-equation-checker/

## Facts used

- M(x, y) dx + N(x, y) dy = 0 is exact when My = Nx identically (the mixed partials of the potential agree).
- If it is exact, integrate M with respect to x, treating y as constant, then fix the leftover function of y by using F_y = N. The solution is F(x, y) = C.
- If My is not equal to Nx, the equation is not exact. Do not invent a potential. An integrating factor, or another first-order method from your syllabus, may still apply.
- Default practice equation: (2x + y) dx + (x + 2y) dy = 0. My = 1 = Nx, so it is exact, and x^2 + xy + y^2 = C.
- These are practice priorities from the guide, not a promise that the same equation will appear. Confirm exact equations are in your own Maths 2 code (the guide discusses BE02000011 and other codes).

## Test

`node test.js` checks the calculations against hand-worked values and prints `All checks passed`.

## Tips

- In the exam, write My and Nx explicitly before you integrate. The potential alone is not the full method.
- Keep fractions exact (x^2, not 2x^2 / 2 left unsimplified, and 1/2 coefficients shown clearly).
- A numerical check at one point is not a proof that My = Nx identically.
- If the question is an IVP, substitute the given point into F = C to find C.

Which Maths 2 topics to practise and how to spot repeated question types: [GTU Hero](https://gtuhero.com/blogs/gtu-maths-2-papers-pyqs-repeated-sums) (GTU Hero is my project).
