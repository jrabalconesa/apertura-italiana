const PIECES = {
  P: "♙", N: "♘", B: "♗", R: "♖", Q: "♕", K: "♔",
  p: "♟", n: "♞", b: "♝", r: "♜", q: "♛", k: "♚"
};

const INITIAL_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const lessons = [
  { code:"ITA-P01", title:"Ocupar y disputar el centro", fen:"rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2", uci:"e2e4 e7e5", notation:"1.e4 e5", stage:"FUNDAMENTOS", explanation:"Ambos bandos reclaman espacio y abren líneas para sus piezas. La partida comienza como una conversación en el centro.", idea:"Un peón central no solo ocupa una casilla: libera piezas y limita las del rival.", hint:"Ocupa el centro con un peón y abre la diagonal del alfil de f1." },
  { code:"ITA-P02", title:"Desarrollar con una amenaza", fen:"r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3", uci:"e2e4 e7e5 g1f3 b8c6", notation:"1.e4 e5 2.Cf3 Cc6", stage:"FUNDAMENTOS", explanation:"El caballo blanco entra en juego atacando e5; el negro responde defendiendo mientras desarrolla. Cada tiempo cumple más de una función.", idea:"La mejor defensa suele ser una jugada que también mejora una pieza.", hint:"Desarrolla el caballo de rey hacia su casilla natural y ataca e5." },
  { code:"ITA-P03", title:"La posición base de la Italiana", fen:"r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4", uci:"e2e4 e7e5 g1f3 b8c6 f1c4 f8c5", notation:"1.e4 e5 2.Cf3 Cc6 3.Ac4 Ac5", stage:"IDENTIDAD", explanation:"El alfil se desarrolla hacia una diagonal activa y permite enrocar. La presión sobre f7 importa, pero todavía no justifica un ataque precipitado.", idea:"Actividad, desarrollo y seguridad son más valiosos que una amenaza fácil de neutralizar.", hint:"Lleva el alfil de f1 a la diagonal que mira hacia f7." },
  { code:"ITA-P04", title:"Rey seguro antes de abrir", fen:"r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 6 5", uci:"e2e4 e7e5 g1f3 b8c6 f1c4 f8c5 e1g1 g8f6", notation:"4.O-O Cf6", stage:"SEGURIDAD", explanation:"El enroque retira al rey del centro y activa la torre. Así, una futura apertura de líneas favorecerá a piezas preparadas.", idea:"Antes de romper el centro, pregunta si tu rey está listo para vivir con líneas abiertas.", hint:"Pon el rey a salvo y activa la torre en una sola jugada." },
  { code:"ITA-P05", title:"Preparar la ruptura", fen:"r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQ1RK1 b kq - 0 5", uci:"e2e4 e7e5 g1f3 b8c6 f1c4 f8c5 e1g1 g8f6 c2c3", notation:"5.c3", stage:"PREPARACIÓN", explanation:"c3 no amenaza algo inmediato, pero sostiene d4 y construye la plataforma para un centro de dos peones.", idea:"Las jugadas de preparación son fuertes cuando hacen posible una ruptura que cambia la posición.", hint:"Prepara d4 con el peón que puede sostener esa casilla." },
  { code:"ITA-P06", title:"La ruptura d4", fen:"r1bq1rk1/pppp1ppp/2n2n2/2b1p3/2BPP3/2P2N2/PP3PPP/RNBQ1RK1 b - d3 0 6", uci:"e2e4 e7e5 g1f3 b8c6 f1c4 f8c5 e1g1 g8f6 c2c3 e8g8 d2d4", notation:"5...O-O 6.d4", stage:"RUPTURA", explanation:"d4 cuestiona e5 y abre el centro. Ahora hay que calcular capturas, no continuar el plan en automático.", idea:"Una ruptura convierte ventajas de desarrollo en actividad concreta.", hint:"Golpea el peón e5 con el peón central que preparaste con c3." },
  { code:"ITA-P07", title:"Centro abierto y desarrollo", fen:"r1bq1rk1/pppp1ppp/1bn2n2/8/2BPP3/5N2/PP3PPP/RNBQ1RK1 w - - 1 8", uci:"e2e4 e7e5 g1f3 b8c6 f1c4 f8c5 e1g1 g8f6 c2c3 e8g8 d2d4 e5d4 c3d4 c5b6", notation:"6...exd4 7.cxd4 Ab6", stage:"DESARROLLO", explanation:"El centro se ha abierto y el caballo de b1 sigue mirando desde casa. Las piezas ganan valor cuando las líneas se despejan.", idea:"Después de abrir el centro, desarrolla la peor pieza antes de buscar un ataque.", hint:"Mejora la pieza de b1 y aumenta el control sobre d5 y e4." },
  { code:"ITA-P08", title:"Coordinar antes de atacar", fen:"r2qr1k1/ppp2ppp/1bnp1n2/8/2BPP1b1/2N1BN2/PP3PPP/R2QR1K1 w - - 4 11", uci:"e2e4 e7e5 g1f3 b8c6 f1c4 f8c5 e1g1 g8f6 c2c3 e8g8 d2d4 e5d4 c3d4 c5b6 b1c3 d7d6 c1e3 c8g4 f1e1 f8e8", notation:"8.Cc3 d6 9.Ae3 Ag4 10.Te1 Te8", stage:"COORDINACIÓN", explanation:"Las piezas menores están desarrolladas y las torres ocupan la columna central. La posición ya permite calcular acciones tácticas.", idea:"Una amenaza funciona mejor cuando cada pieza tiene una función y las torres participan.", hint:"Ocupa la columna e con la torre activada por el enroque." },
  { code:"ITA-P09", title:"Esquema cerrado con d3", fen:"r1bqk2r/ppp2ppp/2np1n2/2b1p3/2B1P3/2PP1N2/PP3PPP/RNBQ1RK1 b kq - 0 6", uci:"e2e4 e7e5 g1f3 b8c6 f1c4 f8c5 d2d3 g8f6 e1g1 d7d6 c2c3", notation:"4.d3 Cf6 5.O-O d6 6.c3", stage:"MANIOBRA", explanation:"Con d3 el centro permanece cerrado. Hay tiempo para mejorar las piezas y reservar d4 para el momento oportuno.", idea:"Cuando el centro está cerrado, el plan se mide en maniobras; cuando se abre, en tiempos.", hint:"Mantén disponible d4 con una jugada de peón que prepare la ruptura." },
  { code:"ITA-P10", title:"La ruta del caballo", fen:"r2qr1k1/bpp2pp1/p1npbn1p/4p3/4P3/1BPP1NNP/PP3PP1/R1BQR1K1 b - - 5 12", uci:"e2e4 e7e5 g1f3 b8c6 f1c4 f8c5 d2d3 g8f6 e1g1 d7d6 c2c3 e8g8 f1e1 a7a6 c4b3 c5a7 h2h3 h7h6 b1d2 f8e8 d2f1 c8e6 f1g3", notation:"10.Cbd2 Te8 11.Cf1 Ae6 12.Cg3", stage:"MANIOBRA", explanation:"El caballo encuentra una ruta paciente: d2–f1–g3. Desde g3 mira el flanco de rey y refuerza e4.", idea:"Mejorar una pieza puede requerir varias jugadas si el centro concede tiempo.", hint:"Completa la ruta del caballo desde f1 hacia una casilla activa del flanco de rey." },
  { code:"ITA-P11", title:"Tras la ruptura negra", fen:"3rr1k1/bppq1pp1/p1n1b2p/3np3/3P4/1BP2NNP/PPB2PP1/R2QR1K1 w - - 0 16", uci:"e2e4 e7e5 g1f3 b8c6 f1c4 f8c5 d2d3 g8f6 e1g1 d7d6 c2c3 e8g8 f1e1 a7a6 c4b3 c5a7 h2h3 h7h6 b1d2 f8e8 d2f1 c8e6 f1g3 d8d7 c1c2 a8d8 d3d4 d6d5 e4d5 f6d5", notation:"14.d4 d5 15.exd5 Cxd5", stage:"RECALCULAR", explanation:"La ruptura ...d5 cambia el carácter de la posición. Se abren líneas y el plan de maniobra deja paso al cálculo.", idea:"Cuando cambia la estructura, borra el plan anterior y vuelve a evaluar amenazas y piezas activas.", hint:"En el centro abierto, busca una captura que aproveche la pieza centralizada." },
  { code:"ITA-P12", title:"Transición al medio juego", fen:"3rr1k1/bppq1pp1/p3b2p/3nR3/3P4/1BP3NP/PPB2PP1/R2Q2K1 b - - 0 17", uci:"e2e4 e7e5 g1f3 b8c6 f1c4 f8c5 d2d3 g8f6 e1g1 d7d6 c2c3 e8g8 f1e1 a7a6 c4b3 c5a7 h2h3 h7h6 b1d2 f8e8 d2f1 c8e6 f1g3 d8d7 c1c2 a8d8 d3d4 d6d5 e4d5 f6d5 f3e5 c6e5 e1e5", notation:"16.Cxe5 Cxe5 17.Txe5", stage:"MEDIO JUEGO", explanation:"La apertura ha terminado: reyes seguros, líneas abiertas y torres activas. Ahora toca evaluar la nueva posición, no seguir una receta.", idea:"El repertorio te lleva a una posición jugable; a partir de ahí manda la comprensión.", hint:"Recupera en e5 con la pieza que gana actividad en la columna abierta." }
];

const variants = [
  {
    code:"VAR-01", title:"Giuoco Pianissimo", level:"REPERTORIO PRINCIPAL", response:"3...Ac5", risk:"Bajo–medio", theory:"Baja", central:"Maniobrar y preparar d4", recommendation:"Estudiar primero",
    moves:"e2e4 e7e5 g1f3 b8c6 f1c4 f8c5 d2d3 g8f6 e1g1 d7d6 c2c3 e8g8 f1e1 a7a6 c4b3 c5a7 b1d2 f8e8 d2f1 h7h6 f1g3 c8e6 b3c2 d6d5",
    summary:"La base recomendada para 800–1200 ELO. Mantiene el centro estable mientras cada pieza mejora antes de ejecutar d4 o responder a ...d5.",
    whitePlans:["Completar Cb1–d2–f1–g3.","Jugar d4 cuando e4 esté protegido.","Conservar el alfil italiano o cambiar una pieza defensora con un motivo concreto."],
    blackPlans:["Preparar ...d5 con ...Te8.","Conservar el alfil mediante ...a6 y ...Aa7.","Cambiar Ac4 con ...Ae6 o buscar ...Ca5 y ...c5."],
    question:"Tras ...Ae6, ¿qué criterio debe decidir entre Ac2 y Axe6?",
    options:["Conservar siempre el alfil, sin excepciones.","Valorar qué pieza conviene conservar o cambiar y si d4 está preparado.","Atacar f7 inmediatamente con todas las piezas."], correct:1,
    feedback:"La decisión depende de la estructura y del momento de d4; no existe una regla automática sobre conservar el alfil."
  },
  {
    code:"VAR-02", title:"Giuoco Piano con d4", level:"CENTRO ABIERTO", response:"3...Ac5", risk:"Medio", theory:"Media", central:"Abrir el centro con desarrollo", recommendation:"Estudiar después",
    moves:"e2e4 e7e5 g1f3 b8c6 f1c4 f8c5 c2c3 g8f6 d2d4 e5d4 c3d4 c5b4 c1d2 b4d2 b1d2 d7d5 e4d5 f6d5 e1g1 e8g8 f1e1",
    summary:"La ruptura inmediata transforma la Italiana en una posición abierta. El peón aislado de d4 puede ser débil si queda bloqueado o dinámico si abre líneas.",
    whitePlans:["Usar la columna e y presionar d5.","Activar las piezas antes de defender pasivamente d4.","Buscar d5 cuando las negras pierdan control central."],
    blackPlans:["Bloquear d4 y cambiar piezas.","Desarrollar con ...Ae6, ...Dd7 y ...Tad8.","Atacar el centro antes que el flanco."],
    question:"Después de 11.Te1, ¿qué factor debe guiar el medio juego blanco?",
    options:["Atacar f7 como en la posición inicial.","Usar activamente el peón aislado y las columnas abiertas.","Cambiar todas las piezas y defender d4."], correct:1,
    feedback:"El tema ya no es f7: importa convertir el peón aislado en actividad antes de que quede bloqueado."
  },
  {
    code:"VAR-03", title:"Gambito Evans aceptado", level:"ARMA OPCIONAL", response:"3...Ac5", risk:"Alto", theory:"Alta", central:"Peón por tiempos e iniciativa", recommendation:"Después del repertorio base",
    moves:"e2e4 e7e5 g1f3 b8c6 f1c4 f8c5 b2b4 c5b4 c2c3 b4a5 d2d4 e5d4 e1g1 d4c3 d1b3 d8f6 e4e5 f6g6 f1e1 g8e7 c1a3",
    summary:"Las blancas sacrifican un peón para ganar tiempos sobre el alfil, ocupar el centro y abrir líneas antes de que las negras completen el desarrollo.",
    whitePlans:["Abrir el centro antes del enroque negro.","Usar Db3, Te1 y Aa3 con amenazas concretas.","No perder tiempos persiguiendo los peones sacrificados."],
    blackPlans:["Devolver material para completar el desarrollo si hace falta.","Cambiar damas cuando sea favorable.","Bloquear e5 y atacar el centro."],
    question:"Tras 8...Df6, ¿qué debe priorizar el blanco?",
    options:["Recuperar inmediatamente cada peón.","Ganar tiempos sobre la dama e incorporar piezas al ataque.","Cerrar el centro para reducir el riesgo."], correct:1,
    feedback:"La compensación del Evans vive en los tiempos y las líneas abiertas, no en recuperar material de inmediato."
  },
  {
    code:"VAR-04", title:"Defensa de los Dos Caballos", level:"RECONOCIMIENTO ESENCIAL", response:"3...Cf6", risk:"Alto", theory:"Media–alta", central:"Contrajuego central contra f7", recommendation:"Imprescindible reconocer",
    moves:"e2e4 e7e5 g1f3 b8c6 f1c4 g8f6 f3g5 d7d5 e4d5 c6a5 c4b5 c7c6 d5c6 b7c6 b5e2 h7h6 g5f3 e5e4 f3e5 f8d6 d2d4 e4d3 e5d3",
    summary:"Las negras responden a la presión sobre f7 golpeando el centro con ...d5. La actividad puede compensar una estructura dañada o un peón de menos.",
    whitePlans:["Consolidar el material antes de atacar.","Frenar el centro negro y completar el desarrollo.","Cambiar piezas activas si se conserva el peón extra."],
    blackPlans:["Usar el centro móvil con ...e4.","Desarrollar con tempo sobre alfil y caballos.","Mantener piezas si la iniciativa es la compensación."],
    question:"Después de ...e4, ¿por qué las negras pueden tener compensación?",
    options:["Porque su estructura es mejor.","Porque han ganado tiempos y sus piezas se activan antes de que las blancas se organicen.","Porque f7 ya no puede ser atacado."], correct:1,
    feedback:"La compensación procede de la iniciativa y los tiempos de desarrollo, aunque la estructura negra esté dañada."
  },
  {
    code:"VAR-05", title:"Ataque Fegatello", level:"PATRÓN TÁCTICO", response:"3...Cf6", risk:"Muy alto", theory:"Alta", central:"Sacrificio para exponer al rey", recommendation:"Patrón, no repertorio base",
    moves:"e2e4 e7e5 g1f3 b8c6 f1c4 g8f6 f3g5 d7d5 e4d5 f6d5 g5f7 e8f7 d1f3 f7e6 b1c3 c6b4 f3e4 c7c6 a2a3 b4a6",
    summary:"Tras la imprecisión 5...Cxd5?! las blancas sacrifican en f7 para sacar al rey. La iniciativa exige sumar piezas, no encadenar jaques sin propósito.",
    whitePlans:["Desarrollar con tempo mediante Cc3 y d4.","Abrir la columna e contra el rey central.","Hacer que cada jaque incorpore una pieza o abra una línea."],
    blackPlans:["Cambiar damas cuando sea posible.","Buscar contrajuego sobre c2.","Devolver material para completar el desarrollo."],
    question:"Después de 7...Re6, ¿cuál es el error conceptual más peligroso para las blancas?",
    options:["Desarrollar una pieza con tempo.","Dar jaques sin incorporar nuevas piezas.","Abrir la columna e."], correct:1,
    feedback:"La iniciativa se agota si sólo juega la dama. Las piezas que siguen en casa deben entrar con tempo."
  },
  {
    code:"VAR-06", title:"Defensa Húngara", level:"RESPUESTA SÓLIDA", response:"3...Ae7", risk:"Bajo", theory:"Baja", central:"Espacio contra solidez", recommendation:"Respuesta sencilla",
    moves:"e2e4 e7e5 g1f3 b8c6 f1c4 f8e7 d2d4 e5d4 f3d4 g8f6 b1c3 e8g8 e1g1 d7d6 f1e1 c8e6 c4e6 f7e6",
    summary:"Las negras preparan el enroque y aceptan un alfil menos activo. Las blancas deben aprovechar el espacio sin inventar un sacrificio sobre f7.",
    whitePlans:["Usar el espacio central.","Presionar e6 y e5.","Preparar Af4, Dd2 y Tad1 sin precipitar el ataque."],
    blackPlans:["Cambiar piezas activas blancas.","Buscar ...d5 en el momento oportuno.","Usar la columna f tras ...fxe6."],
    question:"Tras ...fxe6, ¿cómo debe evaluarse la posición negra?",
    options:["Está perdida por los peones doblados.","Tiene una debilidad en e6, pero también columna f abierta y la ruptura ...d5.","Debe cambiar todas las piezas de inmediato."], correct:1,
    feedback:"La estructura es sólo un factor: la columna f y ...d5 pueden dar actividad suficiente."
  },
  {
    code:"VAR-07", title:"Trampa Blackburne-Shilling", level:"EVITAR LA TRAMPA", response:"3...Cd4?!", risk:"Alto si se desconoce", theory:"Baja", central:"Revisar amenazas antes de capturar", recommendation:"Aprender a evitar",
    moves:"e2e4 e7e5 g1f3 b8c6 f1c4 c6d4 f3e5 d8g5 e5f7 g5g2 h1f1 g2e4 c4e2 d4f3",
    summary:"La extraña 3...Cd4?! invita a capturar e5, pero prepara ...Dg5 y la entrada sobre g2. La defensa práctica consiste en desarrollar y comprobar amenazas.",
    whitePlans:["Responder con Cxd4 o enrocar.","Buscar jaques, capturas y amenazas antes de tomar material.","Priorizar seguridad y desarrollo."],
    blackPlans:["La trampa sólo funciona si las blancas cooperan.","Si el blanco responde bien, el caballo de d4 queda expuesto.","No convertir una trampa en repertorio principal."],
    question:"Después de 3...Cd4?!, ¿qué debe hacer el blanco antes de capturar e5?",
    options:["Calcular sólo cuánto material gana.","Revisar jaques, capturas y amenazas, especialmente ...Dg5.","Mover la dama para defender f2."], correct:1,
    feedback:"La captura automática falla por la entrada de la dama. Primero se revisan las amenazas forzantes del rival."
  }
];
const games = [
  { code:"ITA-M01", title:"Construcción sólida", subtitle:"Desarrollo, centro abierto y una táctica que nace de la coordinación.", moves:["e2e4","e7e5","g1f3","b8c6","f1c4","f8c5","e1g1","g8f6","c2c3","e8g8","d2d4","e5d4","c3d4","c5b6","b1c3","d7d6","c1e3","c8g4","f1e1","f8e8","d1d2","f6e4","c3e4","e8e4","c4f7","g8f7","f3g5","f7g8","g5e4"], san:["e4","e5","Cf3","Cc6","Ac4","Ac5","O-O","Cf6","c3","O-O","d4","exd4","cxd4","Ab6","Cc3","d6","Ae3","Ag4","Te1","Te8","Dd2","Cxe4","Cxe4","Txe4","Axf7+","Rxf7","Cg5+","Rg8","Cxe4"], comments:{7:"Primero, el rey seguro. La futura apertura del centro ya no lo encontrará en e1.",10:"La ruptura temática: ahora hay que calcular las capturas en d4 y e4.",15:"Cc3 mejora la peor pieza y aumenta el control central.",19:"Te1 coordina la torre con el peón e4 y la columna central.",28:"La táctica fue posible porque las piezas estaban desarrolladas y las líneas abiertas."}},
  { code:"ITA-M02", title:"El precio de la precipitación", subtitle:"Una amenaza temprana de dama concede tiempos para el desarrollo rival.", moves:["e2e4","e7e5","g1f3","b8c6","f1c4","f8c5","d1h5","g7g6","h5f3","g8f6","c2c3","e8g8","d2d3","d7d5","e4d5","e5e4","d3e4","f6e4","e1g1","c6e5","f3e4","f8e8"], san:["e4","e5","Cf3","Cc6","Ac4","Ac5","Dh5?!","g6","Df3","Cf6","c3","O-O","d3","d5","exd5","e4!","dxe4","Cxe4","O-O","Ce5","Dxe4","Te8"], comments:{6:"Dh5 crea presión sobre f7, pero obliga a mover la dama de nuevo y retrasa el desarrollo.",13:"...d5 abre el centro porque el negro está mejor desarrollado y su rey ya está seguro.",15:"...e4 gana tiempo atacando piezas: la iniciativa vale más que una amenaza superficial.",19:"El caballo se centraliza con amenazas sobre la dama y el alfil.",21:"La columna e abierta permite a la torre entrar con iniciativa."}},
  { code:"ITA-M03", title:"Centro cerrado y maniobra", subtitle:"El plan lento cambia de golpe cuando ambos bandos rompen con d4 y ...d5.", moves:["e2e4","e7e5","g1f3","b8c6","f1c4","f8c5","d2d3","g8f6","e1g1","d7d6","c2c3","a7a6","c4b3","c5a7","f1e1","e8g8","h2h3","h7h6","b1d2","f8e8","d2f1","c8e6","f1g3","d8d7","c1c2","a8d8","d3d4","d6d5","e4d5","e6d5","f3e5","c6e5","e1e5"], san:["e4","e5","Cf3","Cc6","Ac4","Ac5","d3","Cf6","O-O","d6","c3","a6","Ab3","Aa7","Te1","O-O","h3","h6","Cbd2","Te8","Cf1","Ae6","Cg3","Dd7","Ac2","Tad8","d4","d5","exd5","Axd5","Cxe5","Cxe5","Txe5"], comments:{10:"c3 reserva la ruptura d4 sin definir todavía el centro.",18:"Cbd2 inicia la ruta del caballo hacia f1 y g3.",22:"Desde g3, el caballo participa en el flanco de rey y apoya e4.",27:"...d5 obliga a dejar la maniobra y pasar al cálculo de líneas abiertas.",32:"La posición ya es un medio juego: toca completar el desarrollo y reevaluar e5."}}
];

const moveExplanations = {
  e2e4: "Las blancas ocupan el centro, controlan d5 y f5 y abren líneas para la dama y el alfil de f1.",
  e7e5: "Las negras responden simétricamente: disputan el centro, frenan e4-e5 y liberan el alfil de f8 y la dama.",
  g1f3: "Las blancas desarrollan el caballo con ganancia de tiempo porque atacan el peón negro de e5.",
  b8c6: "Las negras defienden e5 mientras desarrollan una pieza. Además, el caballo controla d4 y evita que las blancas ocupen el centro sin oposición.",
  f1c4: "Las blancas desarrollan el alfil hacia una diagonal activa, presionan f7 y dejan preparado el enroque.",
  f8c5: "Las negras desarrollan su alfil a una casilla activa, presionan f2 y luchan por d4. También quedan listas para enrocar.",
  e1g1: "Las blancas ponen el rey a salvo y activan la torre de f1 antes de abrir el centro.",
  g8f6: "Las negras desarrollan atacando e4. El caballo aumenta la presión central y acerca al rey negro al enroque.",
  c2c3: "Las blancas preparan d4 y construyen una base para disputar el centro con dos peones.",
  e8g8: "Las negras aseguran al rey y activan la torre. Ahora pueden responder a d4 sin dejar al monarca expuesto en el centro.",
  d2d4: "Las blancas ejecutan la ruptura preparada: atacan e5 y buscan abrir líneas para sus piezas desarrolladas.",
  e5d4: "Las negras eliminan la tensión central. Al capturar en d4 obligan a las blancas a decidir cómo reconstruir su centro.",
  c3d4: "Las blancas recapturan con el peón de c3, conservan presencia central y abren la columna c.",
  c5b6: "Las negras conservan el alfil activo ante posibles avances o ataques. Desde b6 sigue mirando f2 y evita un cambio innecesario.",
  b1c3: "Las blancas desarrollan la pieza menos activa y aumentan el control sobre d5 y e4.",
  d7d6: "Las negras sostienen e5, liberan el alfil de c8 y preparan una estructura sólida antes de buscar ...d5.",
  c1e3: "Las blancas completan el desarrollo del flanco de dama y disputan la diagonal del alfil negro.",
  c8g4: "Las negras desarrollan clavando el caballo de f3 contra la dama. Así aumentan la presión sobre d4 y e4.",
  f1e1: "Las blancas colocan la torre en la columna central, refuerzan e4 y preparan recursos tácticos si el centro se abre.",
  f8e8: "Las negras oponen su torre en la columna e, presionan e4 y preparan contrajuego central en vez de defender pasivamente.",
  d2d3: "Las blancas eligen un centro cerrado y conservan la opción de jugar d4 más adelante.",
  a7a6: "Las negras preguntan al alfil de c4 dónde quiere situarse y preparan ...Aa7, manteniendo la diagonal hacia f2 sin permitir molestias en b5.",
  c4b3: "Las blancas conservan el alfil y su presión sobre f7 sin ceder la pareja de alfiles.",
  c5a7: "Las negras retiran el alfil a una diagonal segura. Desde a7 sigue apuntando hacia f2 y queda fuera de los avances centrales.",
  h2h3: "Las blancas evitan ...Ag4 y dan al rey una casilla de escape, aunque gastan un tiempo que debe justificarse.",
  h7h6: "Las negras impiden Ag5 y evitan que un caballo blanco salte a g5 con demasiada comodidad.",
  b1d2: "Las blancas inician la maniobra del caballo hacia f1 y g3, apropiada porque el centro permanece cerrado.",
  d2f1: "El caballo continúa hacia g3, libera d2 y refuerza la defensa del rey.",
  c8e6: "Las negras desarrollan el alfil, disputan c4 y d5 y preparan la coordinación de las torres.",
  f1g3: "El caballo llega a g3, desde donde apoya e4 y puede participar en un ataque sobre el rey.",
  d8d7: "Las negras conectan las torres, apoyan el alfil de e6 y preparan llevar una torre a d8 para respaldar ...d5.",
  c1c2: "Las blancas desarrollan el alfil sin bloquear la columna d y conservan apoyo sobre el flanco de rey.",
  a8d8: "Las negras sitúan la torre detrás del peón d6. El objetivo concreto es preparar la ruptura liberadora ...d5.",
  d3d4: "Las blancas ejecutan por fin la ruptura preparada en la variante cerrada y obligan a reevaluar el centro.",
  d6d5: "Las negras ejecutan su ruptura principal: atacan e4, desafían el centro blanco y abren líneas para sus piezas.",
  e4d5: "Las blancas aclaran la tensión capturando, pero permiten que una pieza negra recupere con actividad.",
  f6d5: "Las negras recapturan con el caballo, que queda centralizado y presiona c3, e3 y f4.",
  f3e5: "Las blancas aprovechan la apertura del centro y colocan el caballo en una casilla activa.",
  c6e5: "Las negras eliminan el caballo central blanco y reducen su presión antes de que se consolide.",
  e1e5: "Las blancas recapturan con la torre, que entra activamente en la quinta fila y completa la transición al medio juego."
};
const state = {
  completed: new Set(JSON.parse(localStorage.getItem("italiana-progress") || "[]")),
  lesson: 0, lessonPly: 0, challenge: 0, selected: null, streak: 0,
  variant: 0, variantPly: 0, variantFlipped: false,
  variantReviews: JSON.parse(localStorage.getItem("italiana-variant-reviews") || "{}"),
  game: 0, gamePly: 0
};

function parseFen(fen) {
  const board = {};
  fen.split(" ")[0].split("/").forEach((row, r) => {
    let file = 0;
    for (const char of row) {
      if (/\d/.test(char)) file += Number(char);
      else { board["abcdefgh"[file] + (8-r)] = char; file++; }
    }
  });
  return board;
}

function applyMove(board, uci) {
  const from = uci.slice(0,2), to = uci.slice(2,4);
  const movingPiece = board[from];
  if (!movingPiece) return;
  if (movingPiece.toUpperCase() === "P" && from[0] !== to[0] && !board[to]) {
    delete board[to[0] + from[1]];
  }
  board[to] = uci.length > 4 ? (movingPiece === movingPiece.toUpperCase() ? uci[4].toUpperCase() : uci[4]) : movingPiece;
  delete board[from];
  if ((board[to] === "K" || board[to] === "k") && Math.abs("abcdefgh".indexOf(from[0]) - "abcdefgh".indexOf(to[0])) === 2) {
    const rank = from[1];
    if (to[0] === "g") { board["f"+rank] = board["h"+rank]; delete board["h"+rank]; }
    else { board["d"+rank] = board["a"+rank]; delete board["a"+rank]; }
  }
}

function boardAt(moves, ply) {
  const board = parseFen(INITIAL_FEN);
  moves.slice(0, ply).forEach(move => applyMove(board, move));
  return board;
}

function renderBoard(element, board, options={}) {
  element.innerHTML = "";
  const ranks = options.flipped ? [1,2,3,4,5,6,7,8] : [8,7,6,5,4,3,2,1];
  const files = options.flipped ? [7,6,5,4,3,2,1,0] : [0,1,2,3,4,5,6,7];
  for (const rank of ranks) {
    for (const f of files) {
      const squareName = "abcdefgh"[f] + rank;
      const square = document.createElement(options.interactive ? "button" : "div");
      square.className = `square ${(f + rank) % 2 ? "light" : "dark"}`;
      square.dataset.square = squareName;
      if (options.lastMove?.includes(squareName)) square.classList.add("last-move");
      if (options.selected === squareName) square.classList.add("selected");
      if (board[squareName]) {
        const piece = document.createElement("span");
        piece.className = `piece ${board[squareName] === board[squareName].toUpperCase() ? "white-piece" : "black-piece"}`;
        const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
        icon.setAttribute("viewBox", "0 0 100 100");
        icon.setAttribute("aria-hidden", "true");
        icon.setAttribute("focusable", "false");
        use.setAttribute("href", `assets/chess-pieces-modern.svg#piece-${board[squareName].toUpperCase()}`);
        icon.appendChild(use);
        piece.appendChild(icon);
        square.appendChild(piece);
      }
      if ((!options.flipped && f === 0) || (options.flipped && f === 7)) {
        const rankLabel = document.createElement("span");
        rankLabel.className = "coordinate rank-coordinate";
        rankLabel.textContent = rank;
        rankLabel.setAttribute("aria-hidden", "true");
        square.appendChild(rankLabel);
      }
      if ((!options.flipped && rank === 1) || (options.flipped && rank === 8)) {
        const fileLabel = document.createElement("span");
        fileLabel.className = "coordinate file-coordinate";
        fileLabel.textContent = "abcdefgh"[f];
        fileLabel.setAttribute("aria-hidden", "true");
        square.appendChild(fileLabel);
      }
      if (options.interactive) {
        square.type = "button";
        square.setAttribute("aria-label", `${squareName}${board[squareName] ? ", " + PIECES[board[squareName]] : ""}`);
        square.addEventListener("click", () => handlePracticeSquare(squareName));
      }
      element.appendChild(square);
    }
  }
}

function showView(id) {
  document.querySelectorAll(".view").forEach(view => view.classList.toggle("active", view.id === id));
  document.querySelectorAll(".nav-link").forEach(link => link.classList.toggle("active", link.dataset.view === id));
  history.replaceState(null, "", `#${id}`);
  window.scrollTo({top:0, behavior:"smooth"});
}

function updateProgress() {
  const count = state.completed.size;
  document.getElementById("headerProgress").textContent = `${count}/12`;
  document.getElementById("headerProgressBar").style.width = `${count / 12 * 100}%`;
  localStorage.setItem("italiana-progress", JSON.stringify([...state.completed]));
}

function renderLessonList() {
  const list = document.getElementById("lessonList");
  list.innerHTML = "";
  lessons.forEach((lesson, i) => {
    const button = document.createElement("button");
    button.className = `lesson-list-button ${i === state.lesson ? "active" : ""} ${state.completed.has(lesson.code) ? "done" : ""}`;
    button.innerHTML = `<span class="dot"></span><span>${lesson.code.replace("ITA-","")}</span><span class="lesson-name">${lesson.title}</span>`;
    button.addEventListener("click", () => { state.lesson=i; state.lessonPly=0; renderLesson(); });
    list.appendChild(button);
  });
}

function renderLesson() {
  const lesson = lessons[state.lesson], moves = lesson.uci.split(" ");
  state.lessonPly = Math.min(state.lessonPly, moves.length);
  const last = state.lessonPly ? moves[state.lessonPly-1] : "";
  renderBoard(document.getElementById("lessonBoard"), boardAt(moves, state.lessonPly), {lastMove:[last.slice(0,2), last.slice(2,4)]});
  document.getElementById("lessonCode").textContent = lesson.code;
  document.getElementById("lessonStageLabel").textContent = lesson.stage;
  document.getElementById("lessonTitle").textContent = lesson.title;
  renderLessonSequence(moves, state.lessonPly);
  document.getElementById("lessonExplanation").textContent = lesson.explanation;
  const activeMove = state.lessonPly ? moves[state.lessonPly - 1] : null;
  const activeSide = state.lessonPly % 2 === 1 ? "BLANCAS" : "NEGRAS";
  document.getElementById("lessonIdeaLabel").textContent = activeMove ? `IDEA DE LAS ${activeSide}` : "IDEA CLAVE";
  document.getElementById("lessonIdea").textContent = activeMove ? (moveExplanations[activeMove] || lesson.idea) : lesson.idea;
  document.getElementById("lessonMoveCounter").textContent = `${state.lessonPly} / ${moves.length}`;
  document.getElementById("lessonTurnLabel").textContent = state.lessonPly ? `Última: ${formatMove(moves[state.lessonPly-1])}` : "Posición inicial";
  document.getElementById("lessonPrev").disabled = state.lessonPly === 0 && state.lesson === 0;
  document.getElementById("lessonNext").disabled = state.lessonPly === moves.length && state.lesson === lessons.length - 1;
  const complete = document.getElementById("completeLesson");
  const done = state.completed.has(lesson.code);
  complete.classList.toggle("done", done);
  complete.textContent = done ? "✓ Posición comprendida" : "Marcar como comprendida";
  renderLessonList();
}

function formatMove(uci) { return `${uci.slice(0,2)}–${uci.slice(2,4)}`; }

function moveLabel(board, uci) {
  const from = uci.slice(0,2), to = uci.slice(2,4), piece = board[from];
  if ((piece === "K" || piece === "k") && Math.abs("abcdefgh".indexOf(from[0]) - "abcdefgh".indexOf(to[0])) === 2) {
    return to[0] === "g" ? "O-O" : "O-O-O";
  }
  const names = {N:"C", B:"A", R:"T", Q:"D", K:"R"};
  const upper = piece?.toUpperCase();
  const capture = Boolean(board[to]) || (upper === "P" && from[0] !== to[0]);
  if (upper === "P") return `${capture ? from[0] + "x" : ""}${to}${uci[4] ? "=" + uci[4].toUpperCase() : ""}`;
  return `${names[upper] || ""}${capture ? "x" : ""}${to}`;
}

function renderLessonSequence(moves, currentPly, containerId="lessonNotation") {
  const container = document.getElementById(containerId);
  const board = parseFen(INITIAL_FEN);
  container.innerHTML = "";
  moves.forEach((move, index) => {
    if (index % 2 === 0) {
      const number = document.createElement("span");
      number.className = "sequence-number";
      number.textContent = `${Math.floor(index / 2) + 1}.`;
      container.appendChild(number);
    }
    const token = document.createElement("span");
    token.className = `sequence-move ${index < currentPly ? "played" : "pending"} ${index === currentPly - 1 ? "active" : ""}`;
    token.textContent = moveLabel(board, move);
    container.appendChild(token);
    applyMove(board, move);
  });
  container.querySelector(".active")?.scrollIntoView({block:"nearest", inline:"nearest"});
}

function previousLessonStep() {
  if (state.lessonPly > 0) state.lessonPly--;
  else if (state.lesson > 0) {
    state.lesson--;
    state.lessonPly = lessons[state.lesson].uci.split(" ").length;
  }
  renderLesson();
}

function nextLessonStep() {
  const moves = lessons[state.lesson].uci.split(" ");
  if (state.lessonPly < moves.length) state.lessonPly++;
  else if (state.lesson < lessons.length - 1) {
    state.lesson++;
    state.lessonPly = 0;
  }
  renderLesson();
}

function challengeData() {
  const lesson = lessons[state.challenge], moves = lesson.uci.split(" ");
  return { lesson, moves, target:moves[moves.length-1], board:boardAt(moves, moves.length-1) };
}

const practiceTransitionDelay = 420;

function pausePracticeTransition() {
  return new Promise(resolve => setTimeout(resolve, practiceTransitionDelay));
}

async function nextPracticeChallenge() {
  const currentIndex = state.challenge;
  const nextIndex = (currentIndex + 1) % lessons.length;
  const button = document.getElementById("nextChallenge");
  button.disabled = true;
  button.textContent = "Preparando siguiente posición…";
  document.getElementById("practiceQuestion").textContent = "Avanzando jugada a jugada";
  document.getElementById("showHint").hidden = true;

  if (nextIndex === 0) {
    document.getElementById("practiceContext").textContent = "Recorrido completado. Volvemos claramente a la posición inicial para comenzar de nuevo.";
    renderBoard(document.getElementById("practiceBoard"), parseFen(INITIAL_FEN));
    await pausePracticeTransition();
    state.challenge = 0;
    button.disabled = false;
    renderPractice();
    return;
  }

  const currentMoves = lessons[currentIndex].uci.split(" ");
  const nextMoves = lessons[nextIndex].uci.split(" ");
  const nextStartPly = nextMoves.length - 1;
  let sharedPly = 0;
  while (sharedPly < currentMoves.length && sharedPly < nextStartPly && currentMoves[sharedPly] === nextMoves[sharedPly]) {
    sharedPly++;
  }

  for (let ply = currentMoves.length - 1; ply >= sharedPly; ply--) {
    const move = currentMoves[ply];
    document.getElementById("practiceContext").textContent = "Cambiamos de variante retrocediendo una jugada cada vez, sin saltos de posición.";
    renderBoard(document.getElementById("practiceBoard"), boardAt(currentMoves, ply), {lastMove:[move.slice(0,2), move.slice(2,4)]});
    await pausePracticeTransition();
  }

  for (let ply = sharedPly + 1; ply <= nextStartPly; ply++) {
    const move = nextMoves[ply - 1];
    document.getElementById("practiceContext").textContent = moveExplanations[move] || "La secuencia avanza exactamente una jugada.";
    renderBoard(document.getElementById("practiceBoard"), boardAt(nextMoves, ply), {lastMove:[move.slice(0,2), move.slice(2,4)]});
    await pausePracticeTransition();
  }

  state.challenge = nextIndex;
  button.disabled = false;
  renderPractice();
}

function renderPractice(resetMessage=true) {
  const {lesson, moves, target, board} = challengeData();
  state.selected = null;
  renderBoard(document.getElementById("practiceBoard"), board, {interactive:true});
  document.getElementById("practiceCode").textContent = lesson.code;
  document.getElementById("practiceLevel").textContent = lesson.stage;
  document.getElementById("practiceQuestion").textContent = "¿Puedes repetir la última jugada?";
  document.getElementById("practiceContext").textContent = `Reconstruye la jugada que conduce a «${lesson.title}». Juegan ${moves.length % 2 ? "blancas" : "negras"}.`;
  const feedback = document.getElementById("practiceFeedback");
  feedback.className = "feedback";
  feedback.innerHTML = '<span>PISTA</span><p id="practiceHint"></p>';
  document.getElementById("practiceHint").textContent = resetMessage ? "Visualiza qué pieza cumple la idea central de esta posición." : lesson.hint;
  document.getElementById("showHint").hidden = false;
  const nextButton = document.getElementById("nextChallenge");
  nextButton.hidden = true;
  nextButton.disabled = false;
  nextButton.textContent = state.challenge === lessons.length - 1 ? "Reiniciar práctica →" : "Siguiente posición →";
  document.getElementById("streak").textContent = state.streak;
  const dots = document.getElementById("challengeDots");
  dots.innerHTML = lessons.map((_,i)=>`<i class="${i < state.challenge ? "done" : i === state.challenge ? "active" : ""}"></i>`).join("");
}

function handlePracticeSquare(square) {
  const data = challengeData();
  if (!state.selected) {
    state.selected = square;
    renderBoard(document.getElementById("practiceBoard"), data.board, {interactive:true, selected:square});
    return;
  }
  const attempt = state.selected + square;
  if (attempt === data.target.slice(0,4)) {
    applyMove(data.board, data.target);
    renderBoard(document.getElementById("practiceBoard"), data.board, {interactive:true, lastMove:[state.selected,square]});
    state.streak++;
    document.getElementById("streak").textContent = state.streak;
    document.getElementById("practiceFeedback").className = "feedback success";
    document.getElementById("practiceFeedback").innerHTML = `<span>¡CORRECTO!</span><p>${data.lesson.idea}</p>`;
    document.getElementById("showHint").hidden = true;
    document.getElementById("nextChallenge").hidden = false;
    state.completed.add(data.lesson.code);
    updateProgress();
  } else {
    state.streak = 0;
    document.getElementById("streak").textContent = "0";
    document.getElementById("practiceFeedback").className = "feedback error";
    document.getElementById("practiceFeedback").innerHTML = `<span>REVISA EL PLAN</span><p>Esa jugada no construye esta posición. ${data.lesson.hint}</p>`;
    state.selected = null;
    renderBoard(document.getElementById("practiceBoard"), data.board, {interactive:true});
  }
}

function variantBranch(index) {
  if (index <= 2) return 0;
  if (index <= 4) return 3;
  return index;
}

function selectVariant(index) {
  state.variant = index;
  state.variantPly = 0;
  renderVariant();
}

function renderVariantList() {
  const list = document.getElementById("variantList");
  list.innerHTML = "";
  variants.forEach((variant, index) => {
    const button = document.createElement("button");
    button.className = `variant-list-button ${index === state.variant ? "active" : ""}`;
    button.innerHTML = `<span>${variant.code.replace("VAR-", "")}</span><b>${variant.title}</b><small>${variant.response}</small>`;
    button.addEventListener("click", () => selectVariant(index));
    list.appendChild(button);
  });
}

function renderComparison() {
  document.getElementById("comparisonBody").innerHTML = variants.map((variant, index) => `
    <tr data-variant-row="${index}">
      <th><button data-open-variant="${index}">${variant.title}</button></th>
      <td>${variant.risk}</td><td>${variant.theory}</td><td>${variant.central}</td><td>${variant.recommendation}</td>
    </tr>`).join("");
  document.querySelectorAll("[data-open-variant]").forEach(button => button.addEventListener("click", () => {
    selectVariant(Number(button.dataset.openVariant));
    document.querySelector(".variant-shell").scrollIntoView({behavior:"smooth", block:"start"});
  }));
}

function answerVariant(optionIndex) {
  const variant = variants[state.variant];
  const options = document.querySelectorAll("#variantOptions button");
  options.forEach((button, index) => {
    button.disabled = true;
    if (index === variant.correct) button.classList.add("correct");
    else if (index === optionIndex) button.classList.add("wrong");
  });
  const feedback = document.getElementById("variantFeedback");
  feedback.className = `concept-feedback ${optionIndex === variant.correct ? "success" : "error"}`;
  feedback.textContent = `${optionIndex === variant.correct ? "Correcto. " : "Revisa el plan. "}${variant.feedback}`;
}

function updateReviewCard() {
  const variant = variants[state.variant];
  const review = state.variantReviews[variant.code];
  const text = document.getElementById("nextReviewText");
  const button = document.getElementById("recordReview");
  if (!review) {
    text.textContent = "Repásala hoy; después volverá a los 3 y 10 días.";
    button.textContent = "Registrar repaso";
    button.disabled = false;
    return;
  }
  if (review.count >= 3) {
    text.textContent = "Ciclo completado: hoy, +3 días y +10 días.";
    button.textContent = "Ciclo completado";
    button.disabled = true;
    return;
  }
  const nextDate = new Date(review.next);
  text.textContent = `Siguiente repaso: ${new Intl.DateTimeFormat("es-ES", {day:"numeric", month:"long"}).format(nextDate)}.`;
  button.textContent = `Registrar repaso ${review.count + 1}/3`;
  button.disabled = false;
}

function recordVariantReview() {
  const code = variants[state.variant].code;
  const previous = state.variantReviews[code] || {count:0};
  const count = Math.min(previous.count + 1, 3);
  const interval = count === 1 ? 3 : count === 2 ? 10 : 0;
  const next = new Date();
  next.setDate(next.getDate() + interval);
  state.variantReviews[code] = {count, next:next.toISOString()};
  localStorage.setItem("italiana-variant-reviews", JSON.stringify(state.variantReviews));
  updateReviewCard();
}
function renderVariant() {
  const variant = variants[state.variant];
  const moves = variant.moves.split(" ");
  state.variantPly = Math.min(state.variantPly, moves.length);
  const last = state.variantPly ? moves[state.variantPly - 1] : "";
  renderBoard(document.getElementById("variantBoard"), boardAt(moves, state.variantPly), {lastMove:last ? [last.slice(0,2), last.slice(2,4)] : [], flipped:state.variantFlipped});
  document.getElementById("variantFlip").textContent = state.variantFlipped ? "Ver desde blancas" : "Ver desde negras";
  document.getElementById("variantMoveCounter").textContent = `${state.variantPly} / ${moves.length}`;
  document.getElementById("variantTurnLabel").textContent = state.variantPly ? `Última: ${formatMove(last)}` : "Posición inicial";
  document.getElementById("variantStart").disabled = state.variantPly === 0;
  document.getElementById("variantPrev").disabled = state.variantPly === 0;
  document.getElementById("variantNext").disabled = state.variantPly === moves.length;
  document.getElementById("variantEnd").disabled = state.variantPly === moves.length;
  document.getElementById("variantCode").textContent = variant.code;
  document.getElementById("variantLevel").textContent = variant.level;
  document.getElementById("variantTitle").textContent = variant.title;
  document.getElementById("variantSummary").textContent = variant.summary;
  renderLessonSequence(moves, state.variantPly, "variantNotation");
  document.getElementById("variantFacts").innerHTML = `<span><small>RIESGO</small><b>${variant.risk}</b></span><span><small>TEORÍA</small><b>${variant.theory}</b></span><span><small>IDEA CENTRAL</small><b>${variant.central}</b></span>`;
  updateReviewCard();
  document.getElementById("whitePlans").innerHTML = variant.whitePlans.map(plan => `<li>${plan}</li>`).join("");
  document.getElementById("blackPlans").innerHTML = variant.blackPlans.map(plan => `<li>${plan}</li>`).join("");
  document.getElementById("variantQuestion").textContent = variant.question;
  document.getElementById("variantOptions").innerHTML = variant.options.map((option, index) => `<button data-option="${index}"><span>${String.fromCharCode(65 + index)}</span>${option}</button>`).join("");
  document.querySelectorAll("#variantOptions button").forEach(button => button.addEventListener("click", () => answerVariant(Number(button.dataset.option))));
  const feedback = document.getElementById("variantFeedback");
  feedback.className = "concept-feedback";
  feedback.textContent = "Elige una respuesta y contrástala con el plan de la posición.";
  document.querySelectorAll(".decision-branch").forEach(button => button.classList.toggle("active", Number(button.dataset.variant) === variantBranch(state.variant)));
  renderVariantList();
}
function renderGameTabs() {
  const tabs = document.getElementById("gameTabs");
  tabs.innerHTML = "";
  games.forEach((game,i)=>{
    const button = document.createElement("button");
    button.className = `game-tab ${i===state.game ? "active" : ""}`;
    button.innerHTML = `<span>${game.code}</span><b>${game.title}</b>`;
    button.addEventListener("click",()=>{state.game=i; state.gamePly=0; renderGame();});
    tabs.appendChild(button);
  });
}

function renderGame() {
  const game = games[state.game];
  state.gamePly = Math.min(state.gamePly, game.moves.length);
  const last = state.gamePly ? game.moves[state.gamePly-1] : "";
  renderBoard(document.getElementById("gameBoard"), boardAt(game.moves,state.gamePly), {lastMove:[last.slice(0,2),last.slice(2,4)]});
  document.getElementById("gameCode").textContent = game.code;
  document.getElementById("gameTitle").textContent = game.title;
  document.getElementById("gameSubtitle").textContent = game.subtitle;
  document.getElementById("gameMoveCounter").textContent = `${state.gamePly} / ${game.moves.length}`;
  document.getElementById("gamePrev").disabled = state.gamePly===0;
  document.getElementById("gameStart").disabled = state.gamePly===0;
  document.getElementById("gameNext").disabled = state.gamePly===game.moves.length;
  document.getElementById("gameEnd").disabled = state.gamePly===game.moves.length;
  document.getElementById("gameComment").textContent = game.comments[state.gamePly-1] || (state.gamePly ? "Observa qué pieza mejoró y qué cambió en el centro." : "Avanza por la partida para descubrir las ideas clave.");
  const sheet = document.getElementById("moveSheet");
  sheet.innerHTML = "";
  game.san.forEach((san,i)=>{
    const button=document.createElement("button");
    button.className=`move-token ${i===state.gamePly-1 ? "active" : ""}`;
    button.innerHTML = `${i%2===0 ? `<span class="move-num">${Math.floor(i/2)+1}.</span>` : ""}${san}`;
    button.addEventListener("click",()=>{state.gamePly=i+1;renderGame();});
    sheet.appendChild(button);
  });
  sheet.querySelector(".active")?.scrollIntoView({block:"nearest",inline:"nearest"});
  renderGameTabs();
}

document.querySelectorAll(".nav-link").forEach(button=>button.addEventListener("click",()=>showView(button.dataset.view)));
document.querySelectorAll("[data-go]").forEach(button=>button.addEventListener("click",()=>showView(button.dataset.go)));
document.getElementById("lessonPrev").addEventListener("click", previousLessonStep);
document.getElementById("lessonNext").addEventListener("click", nextLessonStep);
document.getElementById("completeLesson").addEventListener("click",()=>{
  const code=lessons[state.lesson].code;
  state.completed.has(code) ? state.completed.delete(code) : state.completed.add(code);
  updateProgress(); renderLesson();
});
document.getElementById("showHint").addEventListener("click",()=>{document.getElementById("practiceHint").textContent=lessons[state.challenge].hint;});
document.querySelectorAll(".decision-branch").forEach(button=>button.addEventListener("click",()=>selectVariant(Number(button.dataset.variant))));
document.getElementById("variantFlip").addEventListener("click",()=>{state.variantFlipped=!state.variantFlipped;renderVariant();});
document.getElementById("recordReview").addEventListener("click",recordVariantReview);
document.getElementById("variantStart").addEventListener("click",()=>{state.variantPly=0;renderVariant();});
document.getElementById("variantPrev").addEventListener("click",()=>{state.variantPly--;renderVariant();});
document.getElementById("variantNext").addEventListener("click",()=>{state.variantPly++;renderVariant();});
document.getElementById("variantEnd").addEventListener("click",()=>{state.variantPly=variants[state.variant].moves.split(" ").length;renderVariant();});
document.getElementById("nextChallenge").addEventListener("click", nextPracticeChallenge);
document.getElementById("gamePrev").addEventListener("click",()=>{state.gamePly--;renderGame();});
document.getElementById("gameNext").addEventListener("click",()=>{state.gamePly++;renderGame();});
document.getElementById("gameStart").addEventListener("click",()=>{state.gamePly=0;renderGame();});
document.getElementById("gameEnd").addEventListener("click",()=>{state.gamePly=games[state.game].moves.length;renderGame();});
document.addEventListener("keydown", event => {
  const active=document.querySelector(".view.active")?.id;
  if (active==="aprende" && event.key==="ArrowRight" && !document.getElementById("lessonNext").disabled) nextLessonStep();
  if (active==="aprende" && event.key==="ArrowLeft" && !document.getElementById("lessonPrev").disabled) previousLessonStep();
  if (active==="variantes" && event.key==="ArrowRight" && state.variantPly<variants[state.variant].moves.split(" ").length) {state.variantPly++;renderVariant();}
  if (active==="variantes" && event.key==="ArrowLeft" && state.variantPly>0) {state.variantPly--;renderVariant();}
  if (active==="partidas" && event.key==="ArrowRight" && state.gamePly<games[state.game].moves.length) {state.gamePly++;renderGame();}
  if (active==="partidas" && event.key==="ArrowLeft" && state.gamePly>0) {state.gamePly--;renderGame();}
});

renderBoard(document.getElementById("heroBoard"), boardAt(lessons[2].uci.split(" "),6));
renderLesson();
renderPractice();
renderVariant();
renderComparison();
renderGame();
updateProgress();
const initialView=location.hash.slice(1);
if (["inicio","aprende","practica","variantes","partidas"].includes(initialView)) showView(initialView);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js"));
}
