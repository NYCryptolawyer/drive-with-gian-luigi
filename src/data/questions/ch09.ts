import type { Question } from '../../types';

export const CH09_QUESTIONS: Question[] = [
  {
    id: 'ch09-q01',
    chapterId: 'ch09',
    isRoadSign: false,
    promptEn: 'For a driver age 21 or older in New York State, what Blood Alcohol Content (BAC) level is legal proof of Driving While Intoxicated (DWI)?',
    promptPt: 'Para motoristas com 21 anos ou mais em Nova York, qual teor alcoólico no sangue (BAC) caracteriza crime de DWI?',
    choices: [
      { id: 'A', textEn: '0.02% BAC or higher', textPt: '0,02% ou mais' },
      { id: 'B', textEn: '0.05% BAC or higher', textPt: '0,05% ou mais' },
      { id: 'C', textEn: '0.08% BAC or higher', textPt: '0,08% ou mais' },
      { id: 'D', textEn: '0.12% BAC or higher', textPt: '0,12% ou mais' },
    ],
    correctChoiceId: 'C',
    explanationEn:
      'In New York State, a BAC of 0.08% or higher (for drivers 21+) is per se DWI (Driving While Intoxicated), a serious criminal offense.',
    explanationPt:
      'Em Nova York, 0,08% ou mais de álcool no sangue (para 21+ anos) configura DWI (crime de dirigir embriagado).',
    glossaryTerms: ['BAC', 'DWI'],
    nyRuleSwitch: {
      titleEn: 'NY Law Is Strict — Watch the 0.05% & 0.08% Thresholds',
      titlePt: 'NY tem dois degraus: DWAI (>0,05%) e DWI (0,08%)',
      noteEn: 'Brazil has near-zero tolerance nationwide; NY uses tiered BAC limits: >0.05%–0.07% can still get you charged with DWAI, and 0.08%+ is criminal DWI!',
      notePt: 'No Brasil vale praticamente "zero álcool". Em NY a prova cobra os patamares: acima de 0,05% até 0,07% já dá infração (DWAI), e 0,08%+ é crime (DWI).',
    },
    manualRef: 'NYS Driver’s Manual, Ch. 9 — Alcohol & Drugs',
  },
  {
    id: 'ch09-q02',
    chapterId: 'ch09',
    isRoadSign: false,
    promptEn: 'What BAC range can lead to a DWAI (Driving While Ability Impaired by Alcohol) charge in New York?',
    promptPt: 'Qual faixa de álcool no sangue (BAC) pode gerar acusação de DWAI (Capacidade Comprometida) em Nova York?',
    choices: [
      { id: 'A', textEn: 'More than 0.05% up to 0.07% BAC', textPt: 'Mais de 0,05% até 0,07% de BAC' },
      { id: 'B', textEn: 'Only 0.10% or above', textPt: 'Apenas 0,10% ou acima' },
      { id: 'C', textEn: '0.18% or above', textPt: '0,18% ou acima' },
      { id: 'D', textEn: 'Under 0.08% you can never be charged in New York', textPt: 'Abaixo de 0,08% nunca há infração em NY' },
    ],
    correctChoiceId: 'A',
    explanationEn:
      'Even below 0.08%, driving with a BAC of more than 0.05% up to 0.07% (or impairment below that with drugs) is evidence of DWAI, carrying fines, surcharges, and a 90-day license suspension.',
    explanationPt:
      'Mesmo abaixo de 0,08%, dirigir com mais de 0,05% até 0,07% de álcool no sangue pode render autuação de DWAI, com multa e suspensão da carteira por 90 dias!',
    glossaryTerms: ['BAC', 'DWAI', 'suspension'],
    manualRef: 'NYS Driver’s Manual, Ch. 9 — DWI & DWAI',
  },
  {
    id: 'ch09-q03',
    chapterId: 'ch09',
    isRoadSign: false,
    promptEn: 'What does New York’s "Zero Tolerance Law" apply to?',
    promptPt: 'A quem se aplica a "Zero Tolerance Law" (Lei de Tolerância Zero) em Nova York?',
    choices: [
      { id: 'A', textEn: 'All drivers of every age on New York highways', textPt: 'Todos os motoristas de qualquer idade em rodovias' },
      { id: 'B', textEn: 'Drivers under age 21 who drive with a BAC of 0.02% to 0.07%', textPt: 'Motoristas menores de 21 anos que dirijam com BAC de 0,02% a 0,07%' },
      { id: 'C', textEn: 'Only commercial truck drivers', textPt: 'Apenas caminhoneiros' },
      { id: 'D', textEn: 'Drivers who speed in work zones', textPt: 'Motoristas em áreas de obras' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'Because the legal drinking age in the US is 21, NY’s Zero Tolerance Law makes it illegal for anyone under 21 to drive with a BAC from 0.02% through 0.07% (6-month suspension on first offense).',
    explanationPt:
      'Como a idade legal para beber nos EUA é 21 anos, quem tem menos de 21 anos não pode dirigir nem com 0,02% a 0,07% de álcool (leva 6 meses de suspensão logo na 1ª vez).',
    glossaryTerms: ['BAC', 'suspension'],
    manualRef: 'NYS Driver’s Manual, Ch. 9 — Zero Tolerance Law',
  },
  {
    id: 'ch09-q04',
    chapterId: 'ch09',
    isRoadSign: false,
    promptEn: 'Under New York’s "Implied Consent" law, what happens if you refuse a chemical (breath or blood) test after a lawful DWI arrest?',
    promptPt: 'Pela lei de "Consentimento Implícito" (Implied Consent) de NY, o que acontece se você recusar o teste químico/bafômetro após prisão legal por DWI?',
    choices: [
      { id: 'A', textEn: 'Nothing happens if you are found not guilty of DWI later', textPt: 'Nada acontece se você for absolvida depois' },
      { id: 'B', textEn: 'Your license will be revoked for at least 1 year plus a civil penalty, even if not convicted of DWI', textPt: 'Sua carteira será cassada por pelo menos 1 ano além de multa civil, mesmo se não houver condenação por DWI' },
      { id: 'C', textEn: 'You receive a $50 parking ticket only', textPt: 'Você recebe apenas uma multa de $50' },
      { id: 'D', textEn: 'You simply retake your written test the next day', textPt: 'Você apenas refaz a prova teórica no dia seguinte' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'Refusing a chemical test triggers an automatic DMV license REVOCATION (at least 1 year for a first refusal) and a substantial civil penalty—completely separate from the criminal court outcome.',
    explanationPt:
      'Recusar o teste químico após detenção legal gera CASSAÇÃO (revocation) automática da carteira por pelo menos 1 ano e multa pesada no DMV — independentemente do resultado no processo criminal!',
    glossaryTerms: ['implied consent', 'DWI', 'revocation'],
    watchOutWords: ['EVEN'],
    manualRef: 'NYS Driver’s Manual, Ch. 9 — Chemical Test Refusal',
  },
  {
    id: 'ch09-q05',
    chapterId: 'ch09',
    isRoadSign: false,
    promptEn: 'Which of the following is the ONLY effective way to lower your Blood Alcohol Content (BAC) after drinking?',
    promptPt: 'Qual das opções abaixo é a ÚNICA forma real de diminuir o álcool no sangue (BAC) depois de beber?',
    choices: [
      { id: 'A', textEn: 'Drinking strong black coffee', textPt: 'Tomar café preto bem forte' },
      { id: 'B', textEn: 'Taking a cold shower and exercising', textPt: 'Tomar banho frio e fazer exercício' },
      { id: 'C', textEn: 'Eating a heavy meal after drinking', textPt: 'Comer uma refeição pesada depois de beber' },
      { id: 'D', textEn: 'Time—allowing your liver to break down the alcohol', textPt: 'Tempo — esperar o organismo/fígado eliminar o álcool' },
    ],
    correctChoiceId: 'D',
    explanationEn:
      'Coffee, cold air, showers, and food after drinking do NOT sober you up! Only TIME lowers your BAC (roughly one standard drink per hour).',
    explanationPt:
      'Café forte, banho frio ou comida depois de beber NÃO tiram o álcool do sangue! Só o TEMPO reduz o BAC.',
    glossaryTerms: ['BAC'],
    watchOutWords: ['ONLY'],
    manualRef: 'NYS Driver’s Manual, Ch. 9 — How Alcohol Affects You',
  },
  {
    id: 'ch09-q06',
    chapterId: 'ch09',
    isRoadSign: false,
    promptEn: 'Which driving ability does alcohol usually impair FIRST?',
    promptPt: 'Qual capacidade do motorista o álcool costuma prejudicar PRIMEIRO?',
    choices: [
      { id: 'A', textEn: 'Color vision', textPt: 'Visão das cores' },
      { id: 'B', textEn: 'Judgment and decision-making', textPt: 'Julgamento e tomada de decisão' },
      { id: 'C', textEn: 'Hearing', textPt: 'Audição' },
      { id: 'D', textEn: 'Ability to press the horn', textPt: 'Capacidade de apertar a buzina' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'Even after one drink, alcohol impairs JUDGMENT first—making drivers underestimate risk and overestimate their own driving ability—followed by vision, coordination, and reaction time.',
    explanationPt:
      'Mesmo em pequenas doses, o álcool afeta PRIMEIRO o julgamento (fazendo o motorista subestimar riscos), e em seguida a visão, a coordenação e o tempo de reação.',
    glossaryTerms: ['BAC'],
    manualRef: 'NYS Driver’s Manual, Ch. 9 — Effects of Alcohol',
  },
  {
    id: 'ch09-q07',
    chapterId: 'ch09',
    isRoadSign: false,
    promptEn: 'What happens if you combine alcohol with prescription or over-the-counter medications (like allergy or cold medicine)?',
    promptPt: 'O que acontece ao combinar álcool com medicamentos controlados ou sem receita (como antialérgicos ou antigripais)?',
    choices: [
      { id: 'A', textEn: 'The medicine cancels out the alcohol', textPt: 'O remédio anula o efeito do álcool' },
      { id: 'B', textEn: 'Their effects can multiply, causing dangerous impairment even with very little alcohol', textPt: 'Os efeitos podem se multiplicar, causando forte comprometimento mesmo com pouco álcool' },
      { id: 'C', textEn: 'It is legal as long as your BAC is under 0.08%', textPt: 'É permitido se o BAC ficar abaixo de 0,08%' },
      { id: 'D', textEn: 'Only illegal drugs count toward DWAI-Drugs', textPt: 'Apenas drogas ilícitas contam como DWAI-Drugs' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'Alcohol and medications often have a synergistic (multiplying) effect. Furthermore, driving impaired by ANY drug—even a legal prescription—can result in a DWAI-Drugs charge in NY.',
    explanationPt:
      'Álcool + remédios multiplicam a sonolência e a lentidão! Além disso, dirigir sob efeito de qualquer medicamento que prejudique os reflexos pode gerar autuação por DWAI-Drugs.',
    glossaryTerms: ['DWAI', 'BAC'],
    manualRef: 'NYS Driver’s Manual, Ch. 9 — Drugs & Medications',
  },
  {
    id: 'ch09-q08',
    chapterId: 'ch09',
    isRoadSign: false,
    promptEn: 'What is the difference between a license SUSPENSION and a license REVOCATION in New York?',
    promptPt: 'Qual é a diferença entre SUSPENSÃO (suspension) e CASSAÇÃO (revocation) da carteira em Nova York?',
    choices: [
      { id: 'A', textEn: 'Suspension is temporary; revocation cancels your license so you must reapply after the period ends', textPt: 'Suspensão é temporária; cassação cancela a carteira e exige pedir uma nova habilitação após o prazo' },
      { id: 'B', textEn: 'Revocation only lasts 24 hours', textPt: 'Cassação dura apenas 24 horas' },
      { id: 'C', textEn: 'They mean the exact same thing', textPt: 'Significam exatamente a mesma coisa' },
      { id: 'D', textEn: 'Suspension applies only to motorcycles', textPt: 'Suspensão vale apenas para motos' },
    ],
    correctChoiceId: 'A',
    explanationEn:
      'A SUSPENSION pauses your license temporarily and is lifted once time/requirements are met. A REVOCATION permanently cancels that license; you must apply for a brand-new license after the revocation period.',
    explanationPt:
      'Suspension é um bloqueio temporário. Revocation é o cancelamento definitivo da carteira atual (cassação) — após cumprir o prazo, é preciso solicitar uma nova habilitação ao DMV.',
    glossaryTerms: ['suspension', 'revocation'],
    manualRef: 'NYS Driver’s Manual, Ch. 2 & 9 — Suspensions & Revocations',
  },
  {
    id: 'ch09-q09',
    chapterId: 'ch09',
    isRoadSign: false,
    promptEn: 'What does New York’s Open Container Law say about alcoholic drinks inside a vehicle?',
    promptPt: 'O que diz a lei de "Open Container" (recipiente aberto) sobre bebidas alcoólicas dentro do carro em NY?',
    choices: [
      { id: 'A', textEn: 'Passengers may drink wine or beer in the back seat', textPt: 'Passageiros podem beber vinho ou cerveja no banco de trás' },
      { id: 'B', textEn: 'Neither the driver nor any passenger may have an open alcoholic container inside the passenger area on a public road', textPt: 'Nem o motorista nem os passageiros podem ter bebida alcoólica aberta na cabine em via pública' },
      { id: 'C', textEn: 'Open bottles are allowed in cup holders if only half full', textPt: 'Garrafas abertas podem ficar no porta-copos se tiverem pouco líquido' },
      { id: 'D', textEn: 'Applies only on weekends', textPt: 'Vale apenas nos fins de semana' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'In NY, driving or riding in a vehicle on a public highway with an open container of alcohol in the passenger cabin is illegal—for both driver and passengers. Keep opened bottles locked in the trunk.',
    explanationPt:
      'Em NY é ilegal circular com bebida alcoólica aberta dentro da cabine do carro (para motorista E passageiros!). Garrafas abertas devem ir no porta-malas (trunk).',
    glossaryTerms: [],
    manualRef: 'NYS Driver’s Manual, Ch. 9 — Open Container Law',
  },
];
