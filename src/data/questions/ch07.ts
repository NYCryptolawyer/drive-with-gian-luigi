import type { Question } from '../../types';

export const CH07_QUESTIONS: Question[] = [
  {
    id: 'ch07-q01',
    chapterId: 'ch07',
    isRoadSign: false,
    promptEn: 'When parallel parking in New York State, what is the maximum legal distance your wheels may be from the curb?',
    promptPt: 'Ao estacionar em baliza (parallel parking) em Nova York, qual é a distância máxima permitida entre as rodas e o meio-fio?',
    choices: [
      { id: 'A', textEn: '6 inches (~15 cm)', textPt: '6 polegadas (~15 cm)' },
      { id: 'B', textEn: '12 inches / 1 foot (~30 cm)', textPt: '12 polegadas / 1 pé (~30 cm)' },
      { id: 'C', textEn: '18 inches (~45 cm)', textPt: '18 polegadas (~45 cm)' },
      { id: 'D', textEn: '24 inches (~60 cm)', textPt: '24 polegadas (~60 cm)' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'Your vehicle must be parked parallel to the curb with its wheels no more than 12 inches (1 foot / ~30 cm) from the curb.',
    explanationPt:
      'Em NY, na baliza os pneus devem ficar a no máximo 12 polegadas (1 pé, ou cerca de 30 cm) do meio-fio.',
    glossaryTerms: ['parallel parking', 'curb'],
    nyRuleSwitch: {
      titleEn: '12 Inches (1 Foot) ≈ 30 cm',
      titlePt: 'Regra dos 30 cm (12 inches)',
      noteEn: 'Remember "12 inches = 1 foot" for the test—about the length of a standard school ruler (~30 cm).',
      notePt: 'Na prova aparece como "12 inches" ou "one foot" — o equivalente a uma régua escolar de 30 cm!',
    },
    manualRef: 'NYS Driver’s Manual, Ch. 7 — Parallel Parking',
  },
  {
    id: 'ch07-q02',
    chapterId: 'ch07',
    isRoadSign: false,
    promptEn: 'You park facing UPHILL on a Hudson Valley street that HAS a curb. Which way should you turn your front wheels?',
    promptPt: 'Você estaciona SUBINDO uma ladeira que TEM meio-fio. Para que lado deve esterçar as rodas dianteiras?',
    choices: [
      { id: 'A', textEn: 'Toward the curb (to the right)', textPt: 'Para o lado do meio-fio (para a direita)' },
      { id: 'B', textEn: 'Away from the curb (to the left)', textPt: 'Para fora do meio-fio (para a esquerda)' },
      { id: 'C', textEn: 'Keep the wheels completely straight', textPt: 'Deixar as rodas totalmente retas' },
      { id: 'D', textEn: 'It does not matter as long as the parking brake is set', textPt: 'Tanto faz se o freio de mão estiver puxado' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'Think of gravity! Facing UPHILL WITH a curb, if brakes slip the car rolls backward—turning wheels AWAY from the curb (left) makes the back of the front tire catch against the curb. (Downhill, or any hill WITHOUT a curb: turn toward the curb/right!)',
    explanationPt:
      'Dica infalível: Subindo COM meio-fio = rodas para FORA do meio-fio (esquerda), assim se o carro descer de ré o pneu trava no meio-fio! Em TODOS os outros casos (descendo, ou ladeira SEM meio-fio), vire as rodas para o lado do meio-fio/direita!',
    glossaryTerms: ['curb'],
    manualRef: 'NYS Driver’s Manual, Ch. 7 — Parking on Hills',
  },
  {
    id: 'ch07-q03',
    chapterId: 'ch07',
    isRoadSign: false,
    promptEn: 'You park facing DOWNHILL on a street (with or without a curb). Which way must you turn your front wheels?',
    promptPt: 'Você estaciona DESCENDO uma ladeira (com ou sem meio-fio). Para que lado deve virar as rodas dianteiras?',
    choices: [
      { id: 'A', textEn: 'Away from the curb / edge of the road', textPt: 'Para longe do meio-fio / acostamento' },
      { id: 'B', textEn: 'Toward the curb or edge of the road (to the right)', textPt: 'Em direção ao meio-fio ou borda da pista (para a direita)' },
      { id: 'C', textEn: 'Straight ahead', textPt: 'Retas para a frente' },
      { id: 'D', textEn: 'To the left only if facing north', textPt: 'Para a esquerda dependendo da direção' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'Facing downhill, always turn your front wheels TOWARD the curb or side of the road (right). If the vehicle rolls forward, it will roll gently into the curb or off the roadway instead of into traffic.',
    explanationPt:
      'Descendo a ladeira, vire sempre para o meio-fio / borda direita! Se os freios falharem, o carro trava no meio-fio ou sai para o acostamento em vez de ir para o meio da rua.',
    glossaryTerms: ['curb'],
    manualRef: 'NYS Driver’s Manual, Ch. 7 — Parking on Hills',
  },
  {
    id: 'ch07-q04',
    chapterId: 'ch07',
    isRoadSign: true,
    signId: 'no-standing',
    promptEn: 'What are you legally allowed to do in a New York "NO STANDING" zone?',
    promptPt: 'O que é legalmente permitido fazer em uma zona "NO STANDING" em Nova York?',
    choices: [
      { id: 'A', textEn: 'Wait inside the car with the engine running for 10 minutes', textPt: 'Ficar esperando dentro do carro com o motor ligado por 10 minutos' },
      { id: 'B', textEn: 'Stop briefly ONLY to pick up or drop off passengers—no waiting or loading goods', textPt: 'Parar rapidamente APENAS para embarque ou desembarque de passageiros — sem esperar nem carregar mercadorias' },
      { id: 'C', textEn: 'Unload boxes into a store as long as your hazard lights are on', textPt: 'Descarregar caixas na loja usando o pisca-alerta' },
      { id: 'D', textEn: 'You may not stop at all, not even for a second', textPt: 'Não pode parar nem por um segundo' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'Know NY’s 3-step curb ladder: (1) NO STOPPING = no halting at all (except traffic/signal/officer). (2) NO STANDING = quick passenger drop-off/pick-up ONLY. (3) NO PARKING = quick loading/unloading of passengers OR merchandise.',
    explanationPt:
      'Guarde a escadinha de NY: NO STOPPING (proibido parar totalmente) → NO STANDING (só sobe/desce passageiro rápido) → NO PARKING (pode parar rápido para passageiro ou carga/descarga, só não pode deixar estacionado).',
    glossaryTerms: ['no standing', 'no stopping', 'no parking', 'curb'],
    watchOutWords: ['ONLY'],
    manualRef: 'NYS Driver’s Manual, Ch. 7 — Parking Regulations',
  },
  {
    id: 'ch07-q05',
    chapterId: 'ch07',
    isRoadSign: false,
    promptEn: 'In a "NO PARKING" zone in New York State, what IS permitted?',
    promptPt: 'Em uma zona "NO PARKING" no Estado de Nova York, o que É permitido?',
    choices: [
      { id: 'A', textEn: 'Stopping temporarily to load or unload passengers OR merchandise', textPt: 'Parar temporariamente para embarque/desembarque de passageiros OU carga/descarga de mercadorias' },
      { id: 'B', textEn: 'Leaving the car unoccupied for 15 minutes while running an errand', textPt: 'Deixar o carro estacionado por 15 minutos para resolver algo rápido' },
      { id: 'C', textEn: 'Nothing—you cannot even stop for a passenger', textPt: 'Nada — não pode nem parar para passageiro' },
      { id: 'D', textEn: 'Parking overnight without headlights', textPt: 'Estacionar à noite sem faróis' },
    ],
    correctChoiceId: 'A',
    explanationEn:
      'NO PARKING is the mildest of the three: you cannot leave your car parked, but you may stop temporarily to actively load or unload people or goods.',
    explanationPt:
      'NO PARKING permite parar rapidamente enquanto você embarca/desembarca alguém ou carrega/descarrega compras ou mercadorias — só não pode abandonar o carro estacionado.',
    glossaryTerms: ['no parking', 'no standing', 'no stopping'],
    manualRef: 'NYS Driver’s Manual, Ch. 7 — Parking Regulations',
  },
  {
    id: 'ch07-q06',
    chapterId: 'ch07',
    isRoadSign: false,
    promptEn: 'How close to a fire hydrant may you park a car in New York State?',
    promptPt: 'Qual é a distância mínima que você deve respeitar ao estacionar perto de um hidrante (fire hydrant) em NY?',
    choices: [
      { id: 'A', textEn: 'At least 5 feet away', textPt: 'Pelo menos 5 pés' },
      { id: 'B', textEn: 'At least 10 feet away', textPt: 'Pelo menos 10 pés' },
      { id: 'C', textEn: 'At least 15 feet (~4.5 m) away, unless a licensed driver stays at the wheel ready to move it', textPt: 'Pelo menos 15 pés (~4,5 m), salvo se um motorista habilitado permanecer ao volante pronto para sair' },
      { id: 'D', textEn: 'At least 50 feet away', textPt: 'Pelo menos 50 pés' },
    ],
    correctChoiceId: 'C',
    explanationEn:
      'Do not park, stop, or stand within 15 feet (~4.5 m) of a fire hydrant, unless a licensed driver remains inside the vehicle and can move it immediately in an emergency.',
    explanationPt:
      'Não estacione a menos de 15 pés (~4,5 m) de um hidrante, a não ser que haja um motorista habilitado no banco pronto para tirar o carro na hora.',
    glossaryTerms: ['fire hydrant'],
    watchOutWords: ['unless'],
    manualRef: 'NYS Driver’s Manual, Ch. 7 — Where Not to Park',
  },
  {
    id: 'ch07-q07',
    chapterId: 'ch07',
    isRoadSign: false,
    promptEn: 'Within how many feet of a railroad crossing is parking prohibited in New York?',
    promptPt: 'Até quantos pés de distância de um cruzamento ferroviário é proibido estacionar em NY?',
    choices: [
      { id: 'A', textEn: '15 feet (~4.5 m)', textPt: '15 pés (~4,5 m)' },
      { id: 'B', textEn: '20 feet (~6 m)', textPt: '20 pés (~6 m)' },
      { id: 'C', textEn: '50 feet (~15 m)', textPt: '50 pés (~15 m)' },
      { id: 'D', textEn: '100 feet (~30 m)', textPt: '100 pés (~30 m)' },
    ],
    correctChoiceId: 'C',
    explanationEn:
      'Careful not to mix the two train numbers! You must STOP at least 15 feet from the rails for a train, and you cannot PARK within 50 feet (~15 m) of a railroad crossing.',
    explanationPt:
      'Atenção para não confundir os dois números do trem! Para PARAR diante do trem: mínimo 15 pés (~4,5 m). Para ESTACIONAR: proibido a menos de 50 pés (~15 m)!',
    glossaryTerms: ['railroad crossing'],
    manualRef: 'NYS Driver’s Manual, Ch. 7 — Where Not to Park',
  },
  {
    id: 'ch07-q08',
    chapterId: 'ch07',
    isRoadSign: false,
    promptEn: 'When parallel parking, how close to a crosswalk at an intersection are you prohibited from parking?',
    promptPt: 'A quantos pés de uma faixa de pedestres em um cruzamento é proibido estacionar em NY?',
    choices: [
      { id: 'A', textEn: 'Within 20 feet (~6 m) of a crosswalk at an intersection', textPt: 'A menos de 20 pés (~6 m) da faixa de pedestres no cruzamento' },
      { id: 'B', textEn: 'Within 5 feet', textPt: 'A menos de 5 pés' },
      { id: 'C', textEn: 'Within 100 feet', textPt: 'A menos de 100 pés' },
      { id: 'D', textEn: 'Parking right up to the crosswalk line is allowed', textPt: 'Pode estacionar encostado na faixa' },
    ],
    correctChoiceId: 'A',
    explanationEn:
      'New York prohibits parking on a crosswalk, on a sidewalk, in an intersection, or within 20 feet (~6 m) of a crosswalk at an intersection so pedestrians remain clearly visible.',
    explanationPt:
      'Em NY é proibido estacionar sobre a faixa, na calçada, no cruzamento ou a menos de 20 pés (~6 m) da faixa de pedestres na esquina, garantindo visibilidade dos pedestres.',
    glossaryTerms: ['crosswalk', 'intersection', 'parallel parking'],
    manualRef: 'NYS Driver’s Manual, Ch. 7 — Where Not to Park',
  },
  {
    id: 'ch07-q09',
    chapterId: 'ch07',
    isRoadSign: false,
    promptEn: 'You have just parked along the curb on the street side. What should you always do BEFORE opening your driver’s door?',
    promptPt: 'Você acabou de estacionar junto ao meio-fio. O que você deve SEMPRE fazer ANTES de abrir a porta do motorista?',
    choices: [
      { id: 'A', textEn: 'Open the door quickly so traffic stops for you', textPt: 'Abrir a porta rápido para o trânsito parar' },
      { id: 'B', textEn: 'Check your mirrors and look over your shoulder for oncoming cars and bicyclists', textPt: 'Olhar nos retrovisores e por cima do ombro para checar carros e ciclistas vindo atrás' },
      { id: 'C', textEn: 'Turn on your high-beam headlights', textPt: 'Ligar o farol alto' },
      { id: 'D', textEn: 'Honk once to alert pedestrians', textPt: 'Dar uma buzinada' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'Always check mirrors and your blind spot before opening a traffic-side door (using your far/right hand—the "Dutch Reach"—helps automatically turn your body to spot approaching bikes and cars!).',
    explanationPt:
      'Confira sempre o retrovisor e olhe por cima do ombro antes de abrir a porta para o lado da rua! Ciclistas e carros podem estar passando rente ao meio-fio.',
    glossaryTerms: ['curb', 'blind spot'],
    watchOutWords: ['always', 'BEFORE'],
    manualRef: 'NYS Driver’s Manual, Ch. 7 & 11 — Leaving Your Vehicle',
  },
];
