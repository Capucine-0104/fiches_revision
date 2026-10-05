/*
 * Données des cartes de révision.
 * CHAPTERS : [identifiant de la fiche, titre affiché]
 * CARDS    : [identifiant de la fiche, question, réponse]
 * Les réponses acceptent du HTML simple (<sup>, <sub>, <b>, <span class='ov'> pour un trait au-dessus).
 * Pour ajouter une carte, copier une ligne et modifier le texte.
 */
window.CHAPTERS = [
  ['second-degre', 'Second degré'],
  ['suites', 'Suites'],
  ['limites', 'Limites et continuité'],
  ['derivation', 'Dérivation et convexité'],
  ['exp-ln', 'Exponentielle et logarithme'],
  ['trigo', 'Trigonométrie'],
  ['primitives', 'Primitives et équations différentielles'],
  ['integrales', 'Calcul intégral'],
  ['plan', 'Produit scalaire dans le plan'],
  ['espace', 'Géométrie dans l\'espace'],
  ['denombrement', 'Dénombrement'],
  ['conditionnelles', 'Probabilités conditionnelles'],
  ['binomiale', 'Loi binomiale et concentration'],
  ['complexes', 'Nombres complexes'],
  ['matrices', 'Matrices et graphes'],
  ['arithmetique', 'Arithmétique']
];

window.CARDS = [
  // ---- Second degré
  ['second-degre', "Racines de ax² + bx + c = 0 selon le signe de Δ = b² − 4ac ?",
   "Δ &gt; 0 : deux racines (−b ± √Δ) / 2a.<br>Δ = 0 : une racine −b / 2a.<br>Δ &lt; 0 : aucune racine réelle."],
  ['second-degre', "Forme canonique de ax² + bx + c ?",
   "a(x − α)² + β avec α = −b / 2a et β = f(α). Le sommet de la parabole est (α ; β)."],
  ['second-degre', "Somme et produit des racines x₁ et x₂ ?",
   "x₁ + x₂ = −b / a et x₁x₂ = c / a."],
  ['second-degre', "Signe de ax² + bx + c quand Δ &gt; 0 ?",
   "Signe de a à l'extérieur des racines, signe de −a entre les racines."],

  // ---- Suites
  ['suites', "Terme général d'une suite arithmétique de raison r, puis d'une suite géométrique de raison q ?",
   "uₙ = u₀ + n·r et uₙ = u₀·qⁿ."],
  ['suites', "Somme 1 + q + … + qⁿ pour q ≠ 1 ?",
   "(1 − q<sup>n+1</sup>) / (1 − q)."],
  ['suites', "Somme u₀ + u₁ + … + uₙ d'une suite arithmétique ?",
   "(n + 1)(u₀ + uₙ) / 2 : nombre de termes × moyenne du premier et du dernier."],
  ['suites', "Limite de qⁿ selon la valeur de q ?",
   "q &gt; 1 : +∞.<br>−1 &lt; q &lt; 1 : 0.<br>q = 1 : 1.<br>q ≤ −1 : pas de limite."],
  ['suites', "Méthode pour uₙ₊₁ = a·uₙ + b avec a ≠ 1 ?",
   "On résout ℓ = aℓ + b, donc ℓ = b / (1 − a). La suite vₙ = uₙ − ℓ est géométrique de raison a, donc uₙ = ℓ + aⁿ(u₀ − ℓ)."],
  ['suites', "Que dit le théorème de convergence monotone ?",
   "Une suite croissante et majorée converge. De même pour une suite décroissante et minorée."],
  ['suites', "Les trois étapes d'un raisonnement par récurrence ?",
   "Initialisation : P(n₀) est vraie.<br>Hérédité : P(n) ⇒ P(n+1) pour tout n ≥ n₀.<br>Conclusion : P(n) est vraie pour tout n ≥ n₀."],

  // ---- Limites et continuité
  ['limites', "Croissances comparées en +∞ et en 0 ?",
   "eˣ / xⁿ → +∞ en +∞ ; ln x / xⁿ → 0 en +∞ ; xⁿ·eˣ → 0 en −∞ ; x·ln x → 0 en 0⁺."],
  ['limites', "Les quatre formes indéterminées ?",
   "∞ − ∞, 0 × ∞, ∞ / ∞ et 0 / 0. On change l'écriture : factoriser par le terme dominant, multiplier par le conjugué."],
  ['limites', "Énoncé du théorème des valeurs intermédiaires ?",
   "f continue sur [a ; b] et k entre f(a) et f(b) : l'équation f(x) = k a au moins une solution dans [a ; b]. Elle est unique si f est strictement monotone."],
  ['limites', "Quand y = ℓ est-elle asymptote horizontale ? Quand x = a est-elle asymptote verticale ?",
   "y = ℓ si lim f = ℓ en +∞ ou en −∞.<br>x = a si lim f = ±∞ quand x tend vers a."],

  // ---- Dérivation et convexité
  ['derivation', "Dérivée de uv et de u/v ?",
   "(uv)′ = u′v + uv′ et (u/v)′ = (u′v − uv′) / v²."],
  ['derivation', "Dérivées de uⁿ, eᵘ, ln u et √u ?",
   "(uⁿ)′ = n·u′·uⁿ⁻¹ ; (eᵘ)′ = u′·eᵘ ; (ln u)′ = u′ / u ; (√u)′ = u′ / (2√u)."],
  ['derivation', "Équation de la tangente à la courbe de f au point d'abscisse a ?",
   "y = f′(a)(x − a) + f(a)."],
  ['derivation', "Lien entre convexité et dérivée seconde ?",
   "f″ ≥ 0 : f est convexe (courbe au-dessus de ses tangentes). f″ ≤ 0 : f est concave. Point d'inflexion : f″ s'annule en changeant de signe."],

  // ---- Exponentielle et logarithme
  ['exp-ln', "Propriétés algébriques de l'exponentielle ?",
   "e<sup>a+b</sup> = eᵃ·eᵇ ; e<sup>−a</sup> = 1 / eᵃ ; (eᵃ)ⁿ = e<sup>na</sup> ; eˣ &gt; 0 pour tout x."],
  ['exp-ln', "Propriétés algébriques du logarithme népérien ?",
   "ln(ab) = ln a + ln b ; ln(a/b) = ln a − ln b ; ln(aⁿ) = n·ln a (pour a et b strictement positifs)."],
  ['exp-ln', "Résoudre eˣ = k, puis eˣ ≤ k ?",
   "Pour k &gt; 0 : x = ln k, puis x ≤ ln k (ln est croissante). Si k ≤ 0, l'équation eˣ = k n'a pas de solution."],
  ['exp-ln', "Deux inégalités classiques ?",
   "eˣ ≥ 1 + x pour tout x réel ; ln x ≤ x − 1 pour tout x &gt; 0."],
  ['exp-ln', "Comment résoudre qⁿ ≥ M avec q &gt; 1 ? Et si 0 &lt; q &lt; 1 ?",
   "Avec q &gt; 1 : n ≥ ln M / ln q. Si 0 &lt; q &lt; 1, ln q est négatif : diviser par ln q inverse le sens de l'inégalité."],

  // ---- Trigonométrie
  ['trigo', "Valeurs de cos et sin en 0, π/6, π/4, π/3, π/2 ?",
   "cos : 1, √3/2, √2/2, 1/2, 0.<br>sin : 0, 1/2, √2/2, √3/2, 1."],
  ['trigo', "Solutions de cos x = cos a, puis de sin x = sin a ?",
   "cos x = cos a : x = a + 2kπ ou x = −a + 2kπ.<br>sin x = sin a : x = a + 2kπ ou x = π − a + 2kπ (k ∈ ℤ)."],
  ['trigo', "Formules de duplication ?",
   "cos 2a = cos²a − sin²a = 2cos²a − 1 = 1 − 2sin²a ; sin 2a = 2 sin a cos a."],
  ['trigo', "Parité et période de cos et sin ?",
   "cos est paire, sin est impaire, et toutes deux ont pour période 2π."],

  // ---- Primitives et équations différentielles
  ['primitives', "Primitives de u′uⁿ, de u′/u et de u′eᵘ ?",
   "u<sup>n+1</sup> / (n+1) (n ≠ −1) ; ln|u| (ou ln u si u &gt; 0) ; eᵘ."],
  ['primitives', "Solutions de y′ = ay, puis de y′ = ay + b (a ≠ 0) ?",
   "y = C·e<sup>ax</sup> ; puis y = C·e<sup>ax</sup> − b / a. La constante C se détermine avec la condition initiale."],
  ['primitives', "Primitives de 1/x², 1/√x, cos et sin ?",
   "−1/x ; 2√x ; sin ; −cos (à une constante près)."],

  // ---- Calcul intégral
  ['integrales', "Formule d'intégration par parties ?",
   "∫ₐᵇ u′v = [uv]ₐᵇ − ∫ₐᵇ uv′."],
  ['integrales', "Valeur moyenne de f sur [a ; b] ?",
   "1 / (b − a) · ∫ₐᵇ f(x) dx."],
  ['integrales', "Aire entre deux courbes, avec f ≥ g sur [a ; b] ?",
   "∫ₐᵇ (f(x) − g(x)) dx."],
  ['integrales', "Calcul de ∫₀¹ x·eˣ dx ?",
   "Par parties avec u′ = eˣ et v = x : [x·eˣ]₀¹ − ∫₀¹ eˣ dx = e − (e − 1) = 1."],

  // ---- Produit scalaire dans le plan
  ['plan', "Produit scalaire dans le plan, avec les coordonnées et avec le cosinus ? Condition d'orthogonalité ?",
   "<b>u</b>·<b>v</b> = xx′ + yy′ = ‖<b>u</b>‖·‖<b>v</b>‖·cos θ. Deux vecteurs sont orthogonaux ⇔ <b>u</b>·<b>v</b> = 0."],
  ['plan', "Théorème d'Al-Kashi ?",
   "BC² = AB² + AC² − 2·AB·AC·cos(Â)."],
  ['plan', "Équation d'un cercle de centre (a ; b) et de rayon r ? Équation d'une droite de vecteur normal (a ; b) ?",
   "(x − a)² + (y − b)² = r².<br>Droite : ax + by + c = 0, avec (a ; b) normal à la droite."],

  // ---- Géométrie dans l'espace
  ['espace', "Représentation paramétrique de la droite passant par A et de vecteur directeur <b>u</b>(a ; b ; c) ?",
   "x = x<sub>A</sub> + ta, y = y<sub>A</sub> + tb, z = z<sub>A</sub> + tc, avec t ∈ ℝ."],
  ['espace', "Comment obtenir une équation cartésienne d'un plan ?",
   "Avec un vecteur normal <b>n</b>(a ; b ; c), le plan a pour équation ax + by + cz + d = 0. On calcule d en remplaçant x, y, z par les coordonnées d'un point du plan."],
  ['espace', "Comment trouver l'intersection d'une droite et d'un plan ?",
   "Remplacer x, y, z de la droite (en fonction de t) dans l'équation du plan, résoudre en t, puis recalculer les coordonnées du point."],

  // ---- Dénombrement
  ['denombrement', "Nombre de p-uplets, d'arrangements et de combinaisons de p éléments parmi n ?",
   "nᵖ (avec répétition) ; n! / (n − p)! (l'ordre compte, sans répétition) ; C(n, p) = n! / (p!(n − p)!) (l'ordre ne compte pas)."],
  ['denombrement', "Relation de Pascal et symétrie des coefficients binomiaux ?",
   "C(n, p) + C(n, p+1) = C(n+1, p+1) et C(n, p) = C(n, n − p)."],
  ['denombrement', "Formule du binôme et nombre de parties d'un ensemble à n éléments ?",
   "(a + b)ⁿ = Σ C(n, k)·aᵏ·bⁿ⁻ᵏ pour k de 0 à n. Un ensemble à n éléments a 2ⁿ parties."],

  // ---- Probabilités conditionnelles
  ['conditionnelles', "Définition de P<sub>A</sub>(B) et formule de P(A ∩ B) ?",
   "P<sub>A</sub>(B) = P(A ∩ B) / P(A), donc P(A ∩ B) = P(A)·P<sub>A</sub>(B)."],
  ['conditionnelles', "Formule des probabilités totales ?",
   "P(B) = P(A ∩ B) + P(<span class='ov'>A</span> ∩ B) = P(A)·P<sub>A</sub>(B) + P(<span class='ov'>A</span>)·P<sub><span class='ov'>A</span></sub>(B)."],
  ['conditionnelles', "Quand deux événements A et B sont-ils indépendants ?",
   "Quand P(A ∩ B) = P(A)·P(B), c'est-à-dire P<sub>A</sub>(B) = P(B)."],

  // ---- Loi binomiale et concentration
  ['binomiale', "Loi binomiale B(n, p) : P(X = k), E(X) et V(X) ?",
   "P(X = k) = C(n, k)·pᵏ·(1 − p)ⁿ⁻ᵏ ; E(X) = np ; V(X) = np(1 − p)."],
  ['binomiale', "Probabilité d'obtenir au moins un succès en n épreuves de Bernoulli ?",
   "P(X ≥ 1) = 1 − (1 − p)ⁿ."],
  ['binomiale', "Inégalité de Bienaymé-Tchebychev ?",
   "P(|X − E(X)| ≥ δ) ≤ V(X) / δ²."],
  ['binomiale', "E(aX + b), V(aX + b) et V(X + Y) ?",
   "aE(X) + b ; a²V(X) ; V(X) + V(Y) si X et Y sont indépendantes."],

  // ---- Nombres complexes
  ['complexes', "Module et conjugué de z = a + ib ?",
   "|z| = √(a² + b²) ; <span class='ov'>z</span> = a − ib ; z·<span class='ov'>z</span> = |z|²."],
  ['complexes', "Forme exponentielle et règles de calcul ?",
   "z = |z|·e<sup>iθ</sup>. Pour un produit, les modules se multiplient et les arguments s'additionnent. Puissance : zⁿ = |z|ⁿ·e<sup>inθ</sup>."],
  ['complexes', "Formules de Moivre et d'Euler ?",
   "(cos θ + i sin θ)ⁿ = cos nθ + i sin nθ.<br>cos θ = (e<sup>iθ</sup> + e<sup>−iθ</sup>) / 2 ; sin θ = (e<sup>iθ</sup> − e<sup>−iθ</sup>) / 2i."],
  ['complexes', "Racines de ax² + bx + c quand Δ &lt; 0 ?",
   "z = (−b ± i√(−Δ)) / 2a : deux complexes conjugués."],
  ['complexes', "Racines n-ièmes de l'unité ?",
   "e<sup>2ikπ/n</sup> pour k = 0, 1, …, n − 1 : n points régulièrement répartis sur le cercle unité."],

  // ---- Matrices et graphes
  ['matrices', "Inverse d'une matrice 2 × 2 ?",
   "A = (a b ; c d) est inversible ⇔ ad − bc ≠ 0, et alors A⁻¹ = 1 / (ad − bc) · (d −b ; −c a)."],
  ['matrices', "Comment résoudre un système AX = B ?",
   "Si A est inversible, X = A⁻¹B. Attention : A⁻¹ se place à gauche de B."],
  ['matrices', "Suite de matrices colonnes : Xₙ₊₁ = A·Xₙ, puis Xₙ₊₁ = A·Xₙ + B ?",
   "Xₙ₊₁ = A·Xₙ donne Xₙ = Aⁿ·X₀. Avec un terme constant, l'état stable vérifie X = A·X + B, donc X = (I − A)⁻¹B si I − A est inversible."],
  ['matrices', "Que représente le coefficient (i, j) de Aⁿ pour une matrice d'adjacence A ?",
   "Le nombre de chaînes de longueur n qui relient le sommet i au sommet j."],
  ['matrices', "Comment trouver l'état stable d'un graphe probabiliste ?",
   "On résout π = π·P avec la somme des coefficients de π égale à 1 (π est un vecteur ligne quand P est écrite par lignes)."],

  // ---- Arithmétique
  ['arithmetique', "Définition d'une congruence ?",
   "a ≡ b [n] ⇔ n divise a − b ⇔ a et b ont le même reste dans la division par n."],
  ['arithmetique', "Identité de Bézout, théorème de Bézout et théorème de Gauss ?",
   "Identité de Bézout : si PGCD(a, b) = d, il existe des entiers u et v avec au + bv = d.<br>Théorème de Bézout : a et b sont premiers entre eux ⇔ il existe u et v avec au + bv = 1.<br>Gauss : si a divise bc et PGCD(a, b) = 1, alors a divise c."],
  ['arithmetique', "Petit théorème de Fermat ?",
   "Si p est premier et ne divise pas a, alors a<sup>p−1</sup> ≡ 1 [p]."],
  ['arithmetique', "Quand a est-il inversible modulo n, et comment trouver son inverse ?",
   "Quand PGCD(a, n) = 1. L'inverse se trouve avec Bézout (algorithme d'Euclide étendu). En Python : <code>pow(a, -1, n)</code>."]
];
