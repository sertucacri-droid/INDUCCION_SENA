import { QuizQuestion, CaseStudy, GlossaryTerm } from '../types/induction';

export const INSTITUTIONAL_INFO = {
  name: 'Servicio Nacional de Aprendizaje - SENA',
  slogan: 'Conocimiento y emprendimiento para todos los colombianos',
  founder: 'Rodolfo Martínez Tono',
  foundationYear: '1957',
  decree: 'Decreto Ley 118 del 21 de junio de 1957',
  nature: 'Establecimiento público del orden nacional, adscrito al Ministerio del Trabajo de Colombia.',
  mission: 'El SENA está encargado de cumplir la función que le corresponde al Estado de invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral, para la incorporación y el desarrollo de las personas en actividades productivas que contribuyan al desarrollo social, económico y tecnológico del país.',
  vision: 'En el futuro, el SENA continuará consolidándose como una entidad de clase mundial en formación profesional integral, empleo y emprendimiento, respondiendo con pertinencia y calidad a las transformaciones del mercado laboral, la innovación tecnológica y la justicia social en todas las regiones de Colombia.',
  values: [
    {
      title: 'Honestidad',
      description: 'Actuar siempre con fundamento en la verdad, la transparencia y la rectitud en el uso de los recursos institucionales y en las relaciones humanas.'
    },
    {
      title: 'Respeto',
      description: 'Reconocer, valorar y tratar con dignidad a todas las personas, fomentando la diversidad, la inclusión y los derechos humanos.'
    },
    {
      title: 'Compromiso',
      description: 'Ser consciente de la trascendencia de la labor formativa y orientar todas las capacidades al cumplimiento de la misión social del país.'
    },
    {
      title: 'Diligencia',
      description: 'Cumplir con los deberes, funciones y responsabilidades asignadas con prontitud, esmero, eficiencia y calidad permanente.'
    },
    {
      title: 'Justicia',
      description: 'Actuar con equidad e imparcialidad, garantizando los derechos de todos los miembros de la comunidad formativa SENA.'
    },
    {
      title: 'Solidaridad',
      description: 'Colaborar de manera desinteresada con compañeros e instructores, construyendo comunidad y apoyando a quienes más lo necesitan.'
    }
  ]
};

export const SYMBOLS_DATA = {
  crest: {
    name: 'El Escudo del SENA',
    description: 'Representa los tres grandes sectores económicos de la producción colombiana en los que el SENA forma a sus aprendices.',
    elements: [
      {
        icon: 'cog',
        title: 'La Rueda Dentada (Piñón)',
        sector: 'Sector Industria y Minería',
        meaning: 'Simboliza la fuerza industrial, el desarrollo tecnológico, la manufactura y la maquinaria productiva del país.'
      },
      {
        icon: 'caduceus',
        title: 'El Caduceo de Mercurio',
        sector: 'Sector Comercio y Servicios',
        meaning: 'Representa el intercambio mercantil, la logística, los servicios, la gestión financiera y el dinamismo comercial.'
      },
      {
        icon: 'coffee',
        title: 'Las Ramas de Café',
        sector: 'Sector Agropecuario',
        meaning: 'Reflejan el arraigo a la tierra fértil colombiana, la producción agrícola, la ganadería y el sector campesino (SENA Emprende Rural).'
      }
    ]
  },
  flag: {
    name: 'La Bandera',
    meaning: 'Posee un fondo blanco puro que representa la paz, la tranquilidad y la libertad. En su centro lleva el escudo o logotipo institucional del SENA en color verde esperanza, simbolizando la formación para el progreso del país.'
  },
  logo: {
    name: 'El Logotipo Institucional',
    meaning: 'Diseñado a partir de líneas dinámicas que representan a un ser humano caminando hacia el futuro, proyectándose hacia la cúspide del conocimiento, la autonomía y la inserción laboral digna.'
  },
  anthem: {
    title: 'Himno del SENA',
    lyricsAuthor: 'Jesús Fermín Gómez',
    musicAuthor: 'Daniel Marlez',
    stanzas: [
      {
        type: 'CORO',
        lines: [
          'Estudiantes del SENA adelante,',
          'por Colombia luchad con amor,',
          'con el ánimo noble y radiante,',
          'transformemos el mundo en mejor.'
        ]
      },
      {
        type: 'ESTROFA I',
        lines: [
          'De la patria el futuro destino,',
          'en las manos del joven está,',
          'el trabajo es seguro camino,',
          'que la paz y el progreso nos da.'
        ]
      },
      {
        type: 'ESTROFA II',
        lines: [
          'En la forja del SENA se aprende,',
          'con la ciencia y la técnica a obrar,',
          'donde el alma con fe se desprende,',
          'a luchar, a vencer, a triunfar.'
        ]
      },
      {
        type: 'ESTROFA III',
        lines: [
          'Hoy la patria nos llama a la lidia,',
          'del trabajo fecundo y creador,',
          'olvidemos la duda y la envidia,',
          'y vivamos en paz y en amor.'
        ]
      },
      {
        type: 'ESTROFA IV',
        lines: [
          'Nuestras mentes forjando ideales,',
          'nuestros brazos forjando el metal,',
          'al compás de clarines triunfales,',
          'entonemos el himno triunfal.'
        ]
      }
    ]
  }
};

export const TRAINING_MODEL_DATA = {
  fpi: {
    title: 'Formación Profesional Integral (FPI)',
    definition: 'Es el proceso educativo teórico-práctico de carácter integral, mediante el cual la persona adquiere y desarrolla de manera permanente conocimientos, destrezas y aptitudes para su desarrollo personal y productivo.',
    dimensions: [
      {
        key: 'Saber',
        title: 'Saber (Dimensión Cognitiva)',
        description: 'Apropiación de conceptos, teorías, principios científicos y tecnologías aplicadas a la especialidad.',
        badge: 'Conocimiento'
      },
      {
        key: 'Saber Hacer',
        title: 'Saber Hacer (Dimensión Procedimental)',
        description: 'Capacidad de aplicar lo aprendido en ambientes reales o simulados, resolviendo problemas técnicos con estándares de calidad.',
        badge: 'Habilidad y Destreza'
      },
      {
        key: 'Saber Ser',
        title: 'Saber Ser (Dimensión Actitudinal y Valorativa)',
        description: 'Desarrollo de valores éticos, comunicación asertiva, trabajo en equipo, liderazgo y responsabilidad social y ambiental.',
        badge: 'Ética y Ciudadanía'
      }
    ]
  },
  stages: [
    {
      id: 'lectiva',
      name: 'Etapa Lectiva',
      duration: 'Depende del nivel (Técnico: 6-12 meses | Tecnólogo: 18 meses aprox.)',
      description: 'Periodo de adquisición activa de competencias en ambientes de aprendizaje físicos y virtuales, guiados por instructores a través del desarrollo de un Proyecto Formativo.',
      keyActivities: [
        'Desarrollo de Guías de Aprendizaje',
        'Talleres y prácticas en laboratorios de última tecnología',
        'Evaluación continua por Resultados de Aprendizaje (RAPs)',
        'Participación en ferias, semilleros SENNOVA y actividades de bienestar'
      ]
    },
    {
      id: 'productiva',
      name: 'Etapa Productiva',
      duration: 'Generalmente 6 meses (según diseño curricular)',
      description: 'Periodo en el que el aprendiz aplica, complementa y consolida sus competencias en un entorno laboral real u organizativo.',
      modalities: [
        {
          name: 'Contrato de Aprendizaje',
          description: 'Acuerdo especial entre el aprendiz y una empresa patrocinadora con apoyo de sostenimiento económico y afiliación a EPS y ARL.'
        },
        {
          name: 'Proyecto Productivo',
          description: 'Desarrollo de un emprendimiento innovador asesorado por Fondo Emprender o fortalecimiento de una unidad productiva.'
        },
        {
          name: 'Monitorías',
          description: 'Apoyo pedagógico y técnico en centros de formación SENA en áreas específicas afines al programa.'
        },
        {
          name: 'Pasantías / Convenios',
          description: 'Práctica concertada con instituciones públicas, ONG o empresas sin figura de contrato de aprendizaje pero con aval institucional.'
        },
        {
          name: 'Vínculo Laboral',
          description: 'Cuando el aprendiz ya labora en una empresa en funciones directamente relacionadas con su programa de formación.'
        }
      ]
    }
  ],
  projectPhases: [
    {
      phase: 'Fase 1: Inducción',
      objective: 'Apropiar la identidad SENA, normas de convivencia y metodologías de formación.',
      deliverable: 'Concertación de plan de trabajo y evaluación de inducción aprobada.'
    },
    {
      phase: 'Fase 2: Análisis',
      objective: 'Identificar problemas del sector productivo, diagnosticar necesidades y formular requerimientos.',
      deliverable: 'Documento diagnóstico y especificación técnica inicial del proyecto.'
    },
    {
      phase: 'Fase 3: Planeación',
      objective: 'Diseñar la solución, estructurar el cronograma, presupuesto y modelado técnico.',
      deliverable: 'Diseño arquitectónico, planos o planes de acción detallados.'
    },
    {
      phase: 'Fase 4: Ejecución',
      objective: 'Desarrollar, fabricar, codificar o implementar la solución en ambientes de formación.',
      deliverable: 'Prototipo funcional o producto final terminado.'
    },
    {
      phase: 'Fase 5: Evaluación',
      objective: 'Verificar resultados, medir impacto, sustentación final y cierre de etapa lectiva.',
      deliverable: 'Informe final de proyecto y paz y salvo de etapa lectiva.'
    }
  ]
};

export const REGULATIONS_DATA = {
  agreement: 'Acuerdo 007 de 2012 (Reglamento del Aprendiz SENA)',
  rights: [
    'Recibir formación profesional integral de calidad acorde al programa.',
    'Ser tratado con dignidad, respeto y sin discriminación alguna.',
    'Portar el carné institucional y hacer uso de los ambientes, bibliotecas y recursos.',
    'Acceder a los programas de Bienestar al Aprendiz (salud, deporte, cultura, apoyos).',
    'Conocer los resultados de sus evaluaciones y solicitar revisión dentro de los términos (debido proceso).',
    'Elegir y ser elegido representante de aprendices o vocero de ficha.',
    'Expresar libremente sus ideas respetando los derechos de los demás.'
  ],
  duties: [
    'Portar permanentemente el carné de aprendiz SENA en un lugar visible.',
    'Asistir puntualmente a todas las sesiones de formación y actividades programadas.',
    'Cuidar y mantener en buen estado los equipos, muebles y herramientas del Centro.',
    'Cumplir con las normas de bioseguridad, higiene y salud y seguridad en el trabajo (SST).',
    'Respetar los derechos de autor y evitar cualquier práctica de plagio o fraude académico.',
    'Mantener un trato respetuoso hacia instructores, directivos, compañeros y personal de apoyo.',
    'Reportar oportunamente justificaciones de inasistencia (dentro de los 3 días hábiles siguientes).'
  ],
  faultTypes: [
    {
      type: 'Faltas Académicas',
      definition: 'Relacionadas directamente con el incumplimiento en la entrega de evidencias, inasistencias injustificadas, plagio o bajo rendimiento reiterado.'
    },
    {
      type: 'Faltas Disciplinarias',
      definition: 'Relacionadas con la conducta, porte de elementos prohibidos, agresiones verbales o físicas, deterioro intencional de bienes institucionales o conductas que atenten contra la comunidad.'
    }
  ],
  measures: [
    {
      name: 'Llamado de Atención Verbal',
      type: 'Formativa',
      description: 'Diálogo reflexivo con el instructor sobre faltas leves para concertar compromisos de mejora.'
    },
    {
      name: 'Plan de Mejoramiento Académico o Disciplinario',
      type: 'Formativa',
      description: 'Documento concertado con actividades específicas y fecha límite para superar insuficiencias pedagógicas o conductuales.'
    },
    {
      name: 'Condicionamiento de Matrícula',
      type: 'Sancionatoria',
      description: 'Pérdida temporal de beneficios como apoyos de sostenimiento e inhabilidad para representar al SENA hasta demostrar cambio de conducta.'
    },
    {
      name: 'Cancelación de Matrícula',
      type: 'Sancionatoria Máxima',
      description: 'Pérdida definitiva del cupo en el SENA con sanción de 6 meses a 2 años sin poder inscribirse en programas de formación titulada.'
    }
  ]
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case_attendance',
    title: 'Caso 1: Inasistencias y Justificación',
    situation: 'Mateo tuvo una emergencia de salud y faltó a formación durante 3 días seguidos. Al regresar al cuarto día, se entera de que si acumula inasistencias sin soporte puede incurrir en causal de deserción. ¿Cuál es el procedimiento correcto según el reglamento?',
    role: 'Aprendiz Mateo',
    options: [
      {
        text: 'Esperar a final de mes y decirle informalmente al instructor que estaba enfermo.',
        isCorrect: false,
        feedback: 'Incorrecto. El reglamento establece plazos perentorios y exige soportes formales válidos.'
      },
      {
        text: 'Radicar la incapacidad médica formal ante la coordinación académica y su instructor dentro de los 3 días hábiles siguientes al hecho.',
        isCorrect: true,
        feedback: '¡Correcto! El Acuerdo 007 de 2012 estipula que las justificaciones deben presentarse con soporte documental dentro de los 3 días hábiles posteriores a la inasistencia.'
      },
      {
        text: 'Pedirle a un compañero que firme la lista de asistencia por él para no figurar como inasistente.',
        isCorrect: false,
        feedback: 'Incorrecto. La suplantación o falsedad en listas es una falta disciplinaria gravísima.'
      }
    ]
  },
  {
    id: 'case_id_card',
    title: 'Caso 2: Uso del Carné Institucional',
    situation: 'Laura olvidó su carné del SENA en su casa. Un compañero le ofrece prestarle el carné suyo para que pueda entrar por el torniquete de portería del Centro de Formación. ¿Qué debe hacer Laura?',
    role: 'Aprendiz Laura',
    options: [
      {
        text: 'Rechazar el préstamo del carné y acercarse al punto de registro de portería con su documento de identidad para el ingreso formal provisional.',
        isCorrect: true,
        feedback: '¡Excelente decisión! El carné institucional es personal e intransferible. Prestar o usar el carné de otra persona constituye una falta disciplinaria grave.'
      },
      {
        text: 'Usar el carné de su compañero rápidamente antes de que el vigilante se dé cuenta.',
        isCorrect: false,
        feedback: 'Incorrecto. Esto puede desencadenar un proceso disciplinario sancionatorio para ambos aprendices.'
      },
      {
        text: 'Regresarse a casa y perder todo el día de formación.',
        isCorrect: false,
        feedback: 'Incorrecto. Los centros cuentan con protocolo de verificación por documento de identidad mientras se tramita el ingreso.'
      }
    ]
  },
  {
    id: 'case_plagiarism',
    title: 'Caso 3: Integridad Académica y Fuentes',
    situation: 'Durante el desarrollo de una guía de aprendizaje sobre investigación de mercados, Andrés copia textualmente varios capítulos de un blog de internet sin citar al autor ni utilizar normas APA / ICONTEC.',
    role: 'Aprendiz Andrés',
    options: [
      {
        text: 'Está bien porque la información en internet es de dominio público y no necesita autor.',
        isCorrect: false,
        feedback: 'Incorrecto. El plagio atenta contra la propiedad intelectual y es una falta académica grave según el reglamento.'
      },
      {
        text: 'Debe parafrasear, citar adecuadamente las fuentes bibliográficas y construir su propio análisis crítico.',
        isCorrect: true,
        feedback: '¡Correcto! En el SENA se promueve el rigor ético y la honestidad académica. Citar fuentes garantiza transparencia y respeto a los autores.'
      },
      {
        text: 'Cambiar solo 2 o 3 palabras con sinónimos automáticos para engañar los detectores de similitud.',
        isCorrect: false,
        feedback: 'Incorrecto. La simulación académica no contribuye al desarrollo de verdaderas competencias de aprendizaje.'
      }
    ]
  },
  {
    id: 'case_productive',
    title: 'Caso 4: Requisitos para Etapa Productiva',
    situation: 'Una empresa contacta a Valentina para ofrecerle un contrato de aprendizaje inmediato, pero a ella le falta aprobar dos Resultados de Aprendizaje (RAP) de su etapa lectiva. ¿Puede iniciar la etapa productiva?',
    role: 'Aprendiz Valentina',
    options: [
      {
        text: 'Sí, puede iniciar y olvidarse de los resultados pendientes porque la empresa es lo importante.',
        isCorrect: false,
        feedback: 'Incorrecto. No se puede certificar una etapa lectiva incompleta.'
      },
      {
        text: 'Debe concertar con sus instructores un plan de mejoramiento para aprobar todos sus RAPs pendientes antes o durante el plazo estipulado para no poner en riesgo su contrato ni su certificación.',
        isCorrect: true,
        feedback: '¡Exacto! Para que la etapa productiva sea válida y el aprendiz logre su titulación, debe tener aprobados al 100% los resultados de aprendizaje de la etapa lectiva.'
      },
      {
        text: 'Pedirle a la empresa que le pague por debajo de cuerda sin registrar nada ante el SENA.',
        isCorrect: false,
        feedback: 'Incorrecto. El contrato de aprendizaje legal debe estar avalado en el aplicativo Caprendizaje del SENA.'
      }
    ]
  }
];

export const PLATFORMS_DATA = [
  {
    id: 'zajuna',
    name: 'Zajuna (Ambiente Virtual)',
    tagline: 'LMS Oficial del SENA',
    description: 'Plataforma de gestión del aprendizaje en línea desarrollada sobre tecnología de vanguardia que sustituyó a Territorium. Aquí encuentras foros, evidencias, calificaciones, materiales y sesiones en línea.',
    urlText: 'zajuna.sena.edu.co',
    features: ['Envío de evidencias de guías', 'Foros temáticos y sociales', 'Portafolio de evidencias', 'Evaluaciones en línea']
  },
  {
    id: 'sofia',
    name: 'SOFIA Plus',
    tagline: 'Sistema de Información Académica',
    description: 'Sistema Optimizado para la Formación Integral del Aprendizaje activo. Gestiona inscripciones, matrículas, certificados oficiales, hojas de vida de aprendices y horarios de formación.',
    urlText: 'senasofiaplus.edu.co',
    features: ['Consulta de notas y juicios evaluativos', 'Descarga de constancias y certificados', 'Actualización de datos personales', 'Asignación de fichas']
  },
  {
    id: 'email',
    name: 'Correo Institucional Soy SENA',
    tagline: 'Canal Oficial de Comunicación',
    description: 'Cuenta de correo institucional provista con almacenamiento en la nube, acceso a herramientas ofimáticas y canal formal de comunicación con instructores y directivas.',
    urlText: 'correo.misena.edu.co',
    features: ['Herramientas colaborativas', 'Notificaciones de actividades y bienestar', 'Acceso a licencias educativas']
  },
  {
    id: 'sbs',
    name: 'Sistema de Bibliotecas SENA (SBS)',
    tagline: 'Centro de Conocimiento Digital',
    description: 'Red de bibliotecas físicas y digitales con acceso gratuito a más de 50 bases de datos científicas internacionales, libros electrónicos, normas técnicas y repositorios institucionales.',
    urlText: 'biblioteca.sena.edu.co',
    features: ['Libros electrónicos multidisciplinares', 'Bases de datos indexadas (Scopus, Ebsco, etc.)', 'Préstamo de material físico', 'Talleres de normas APA']
  },
  {
    id: 'ape',
    name: 'Agencia Pública de Empleo (APE)',
    tagline: 'Intermediación Laboral Gratuita',
    description: 'Servicio público de intermediación laboral que conecta a los aprendices y egresados SENA con empresas que buscan talento humano en todo el territorio nacional.',
    urlText: 'agenciapublicadeempleo.sena.edu.co',
    features: ['Convocatorias laborales nacionales e internacionales', 'Orientación ocupacional personalizada', 'Ferias de empleo']
  },
  {
    id: 'sennova',
    name: 'SENNOVA & Tecnoparque',
    tagline: 'Investigación, Desarrollo e Innovación',
    description: 'Ecosistema institucional que impulsa la investigación aplicada, el desarrollo tecnológico y la innovación a través de semilleros de investigación y nodos de aceleración tecnológica.',
    urlText: 'sennova.sena.edu.co',
    features: ['Semilleros de investigación formativa', 'Laboratorios de prototipado rápido', 'Asesoría técnica para proyectos I+D+i']
  }
];

export const WELLBEING_DIMENSIONS = [
  {
    title: 'Salud Integral',
    desc: 'Jornadas de prevención, salud mental, primeros auxilios psicológicos y autocuidado en los centros.'
  },
  {
    title: 'Deporte y Recreación',
    desc: 'Torneos intercentros, acondicionamiento físico, ajedrez, fútbol de salón y pausas activas.'
  },
  {
    title: 'Arte y Cultura',
    desc: 'Talleres de danzas, teatro, música, artes plásticas y festivales culturales regionales y nacionales.'
  },
  {
    title: 'Liderazgo y Representación',
    desc: 'Elección democrática de representantes y voceros de ficha, campamentos de liderazgo juvenil.'
  },
  {
    title: 'Apoyos Socioeconómicos',
    desc: 'Apoyos de sostenimiento regular, apoyos FIC (Construcción), monitorías y planes de conectividad.'
  },
  {
    title: 'Convivencia y Equidad',
    desc: 'Promoción de la no violencia, equidad de género, inclusión para población diversa y resolución pacífica de conflictos.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ==========================================
  // SECCIÓN 1: DERECHOS DEL APRENDIZ (5 PREGUNTAS)
  // ==========================================
  {
    id: 1,
    sectionKey: 'derechos',
    sectionTitle: 'Sección 1: Derechos del Aprendiz (Capítulo II)',
    question: '¿Cuál de las siguientes afirmaciones describe un DERECHO fundamental del aprendiz en su proceso formativo según el Reglamento (Acuerdo 007 de 2012)?',
    category: 'Derechos del Aprendiz',
    options: [
      'Recibir inducción completa, formación profesional integral de calidad acorde a su programa y acceso a los ambientes de aprendizaje.',
      'Decidir de forma unilateral cuándo presentar evidencias sin concertación previa con el instructor.',
      'Cobrar a sus compañeros de ficha por compartir resúmenes de las guías de aprendizaje.',
      'Utilizar la maquinaria del centro sin necesidad de Elementos de Protección Personal (EPP).'
    ],
    correctIndex: 0,
    explanation: 'El Capítulo II del Reglamento estipula el derecho a recibir inducción completa al ingresar, formación profesional integral de calidad y acceso a los ambientes, tecnologías y bibliotecas del Centro.',
    positivePraise: '¡Excelente! Conoces tus garantías de formación de calidad y acceso a los recursos institucionales.',
    correctionTip: 'Identifica tu error: Recuerda que los derechos no otorgan facultades para incumplir normas de seguridad ni concertaciones pedagógicas. Tu derecho es recibir formación con calidad y acceso a infraestructura.'
  },
  {
    id: 2,
    sectionKey: 'derechos',
    sectionTitle: 'Sección 1: Derechos del Aprendiz (Capítulo II)',
    question: 'Frente a los resultados de las evaluaciones y juicios evaluativos emitidos por los instructores, ¿cuál es el derecho garantizado al aprendiz?',
    category: 'Derechos del Aprendiz',
    options: [
      'Exigir la aprobación automática de todos los Resultados de Aprendizaje sin presentar evidencias.',
      'Conocer oportunamente los resultados y solicitar revisión o aclaración motivada dentro del debido proceso.',
      'Rechazar las evaluaciones que considere difíciles y solicitar cambio de instructor sin justificación.',
      'Presentar las reclamaciones únicamente al finalizar todo el año lectivo.'
    ],
    correctIndex: 1,
    explanation: 'El aprendiz tiene derecho a ser informado oportunamente sobre el estado de sus evaluaciones y a solicitar revisión formal de sus evidencias ante el instructor o comité respetando los términos del debido proceso.',
    positivePraise: '¡Brillante! El debido proceso y la retroalimentación oportuna son pilares fundamentales en el SENA.',
    correctionTip: 'Identifica tu error: La evaluación formativa exige evidencias válidas. Tu derecho es conocer la retroalimentación a tiempo y solicitar revisión justificada, no la aprobación automática.'
  },
  {
    id: 3,
    sectionKey: 'derechos',
    sectionTitle: 'Sección 1: Derechos del Aprendiz (Capítulo II)',
    question: 'En relación con los programas y servicios institucionales, ¿a cuál de los siguientes beneficios tiene derecho el aprendiz SENA?',
    category: 'Derechos del Aprendiz',
    options: [
      'Exclusividad sobre los computadores del laboratorio para uso recreativo personal.',
      'Acceder a los programas de Bienestar al Aprendiz en salud, deporte, arte, cultura y apoyos socioeconómicos según la reglamentación.',
      'Recibir un salario profesional formal durante la etapa de inducción sin contrato.',
      'Disponer libremente de los materiales de los talleres para proyectos particulares en su hogar.'
    ],
    correctIndex: 1,
    explanation: 'Todo aprendiz activo tiene derecho a acceder a los beneficios y convocatorias del Plan de Bienestar al Aprendiz (salud integral, recreación, torneos, monitorías y apoyos de sostenimiento).',
    positivePraise: '¡Muy bien! El Bienestar al Aprendiz es un derecho concebido para tu desarrollo integral como ser humano.',
    correctionTip: 'Identifica tu error: Los recursos institucionales son para uso académico. El derecho garantizado es acceder a los programas de bienestar y formación integral.'
  },
  {
    id: 4,
    sectionKey: 'derechos',
    sectionTitle: 'Sección 1: Derechos del Aprendiz (Capítulo II)',
    question: '¿Qué derecho de participación democrática contempla el Reglamento del Aprendiz en la comunidad educativa?',
    category: 'Derechos del Aprendiz',
    options: [
      'Elegir y ser elegido democráticamente como Vocero de Ficha o Representante de Aprendices del Centro de Formación.',
      'Organizar paros laborales que impidan el ingreso del personal administrativo.',
      'Nombrar o destituir instructores de planta y coordinadores académicos.',
      'Establecer unilateralmente los horarios de formación de toda la sede.'
    ],
    correctIndex: 0,
    explanation: 'El reglamento consagra el derecho a la participación democrática, permitiendo elegir y postularse como vocero de ficha o representante general ante el Comité de Centro.',
    positivePraise: '¡Gran acierto! La participación y el liderazgo democrático fortalecen el tejido comunitario del SENA.',
    correctionTip: 'Identifica tu error: La representación del aprendiz se ejerce a través de los mecanismos democráticos de elección de voceros y representantes, no interviniendo en la administración de personal.'
  },
  {
    id: 5,
    sectionKey: 'derechos',
    sectionTitle: 'Sección 1: Derechos del Aprendiz (Capítulo II)',
    question: 'Cuando un aprendiz es requerido en un procedimiento académico o disciplinario, ¿qué principio constitucional y reglamentario lo ampara?',
    category: 'Derechos del Aprendiz',
    options: [
      'La inmunidad disciplinaria absoluta por ser estudiante.',
      'El principio del Debido Proceso, derecho a la defensa y ser escuchado antes de cualquier decisión o sanción.',
      'La anulación inmediata de todo el reglamento institucional.',
      'La intervención obligatoria de la justicia penal en faltas académicas.'
    ],
    correctIndex: 1,
    explanation: 'Todo trámite disciplinario o formativo en el SENA se rige estrictamente por el Debido Proceso: derecho a ser notificado, presentar descargos, aportar pruebas y controvertir decisiones.',
    positivePraise: '¡Perfecto! El Debido Proceso es la máxima garantía constitucional y reglamentaria de todo aprendiz.',
    correctionTip: 'Identifica tu error: No existe inmunidad disciplinaria. La garantía es el derecho a ser escuchado, presentar descargos y controvertir pruebas bajo el debido proceso.'
  },

  // ==========================================
  // SECCIÓN 2: DEBERES INSTITUCIONALES (5 PREGUNTAS)
  // ==========================================
  {
    id: 6,
    sectionKey: 'deberes',
    sectionTitle: 'Sección 2: Deberes Institucionales (Capítulo III)',
    question: 'Respecto al porte y uso del carné institucional del SENA, ¿cuál es el deber estipulado en el reglamento?',
    category: 'Deberes Institucionales',
    options: [
      'Portarlo permanentemente en un lugar visible mientras permanezca en los ambientes de formación o represente al SENA.',
      'Guardarlo en la billetera y mostrarlo únicamente al momento de la graduación.',
      'Prestarlo a familiares o amigos para que ingresen a las instalaciones del centro.',
      'Pegarle calcomanías decorativas sobre la fotografía para personalizarlo.'
    ],
    correctIndex: 0,
    explanation: 'El carné institucional es personal e intransferible. Es deber del aprendiz portarlo de manera visible en todo momento para seguridad e identificación en los centros.',
    positivePraise: '¡Correcto! El carné visible identifica tu rol activo y garantiza la seguridad de toda la comunidad.',
    correctionTip: 'Identifica tu error: El carné es intransferible y de porte obligatorio y visible; prestarlo o modificarlo constituye una falta disciplinaria.'
  },
  {
    id: 7,
    sectionKey: 'deberes',
    sectionTitle: 'Sección 2: Deberes Institucionales (Capítulo III)',
    question: 'Si por fuerza mayor o calamidad médica comprobada no puedes asistir a formación, ¿cuál es el deber y plazo fijado por el reglamento?',
    category: 'Deberes Institucionales',
    options: [
      'Avisar en grupos informales de redes sociales sin presentar soportes médicos.',
      'Radicar la justificación formal con sus soportes dentro de los 3 días hábiles siguientes al hecho ante el instructor y coordinación.',
      'Esperar hasta la última semana del trimestre para justificar todas las inasistencias acumuladas.',
      'Solicitar a otro compañero que firme la lista de asistencia en su nombre.'
    ],
    correctIndex: 1,
    explanation: 'El Acuerdo 007 de 2012 establece que toda inasistencia debe justificarse documentalmente dentro de los tres (3) días hábiles siguientes ante la coordinación académica e instructor.',
    positivePraise: '¡Excelente rigor! Conocer los 3 días hábiles evita incurrir en procesos por presunta deserción.',
    correctionTip: 'Identifica tu error: El plazo límite es de 3 días hábiles con soporte formal; firmar por otro es suplantación (falta gravísima) y esperar a fin de trimestre causa deserción.'
  },
  {
    id: 8,
    sectionKey: 'deberes',
    sectionTitle: 'Sección 2: Deberes Institucionales (Capítulo III)',
    question: '¿Cuál es el deber del aprendiz con respecto al cuidado de los bienes, herramientas y ambientes de formación del SENA?',
    category: 'Deberes Institucionales',
    options: [
      'Cuidar, conservar y hacer uso exclusivo de los equipos y herramientas para los fines pedagógicos autorizados.',
      'Desarmar los equipos informáticos para verificar componentes sin autorización técnica.',
      'Sacar las herramientas del centro los fines de semana para labores particulares.',
      'Dejar la limpieza y orden del ambiente de aprendizaje a cargo del personal de vigilancia.'
    ],
    correctIndex: 0,
    explanation: 'Los ambientes, máquinas y equipos son patrimonio del Estado colombiano. Es deber conservarlos en óptimas condiciones y responder por su correcto uso formativo.',
    positivePraise: '¡Muy bien! El cuidado del mobiliario y tecnologías garantiza ambientes dignos para las actuales y futuras generaciones.',
    correctionTip: 'Identifica tu error: El aprendiz es responsable directo del cuidado de las herramientas asignadas durante la práctica; extraerlas o dañarlas acarrea sanciones disciplinarias.'
  },
  {
    id: 9,
    sectionKey: 'deberes',
    sectionTitle: 'Sección 2: Deberes Institucionales (Capítulo III)',
    question: 'En materia de Seguridad y Salud en el Trabajo (SST), ¿cuál es el deber ineludible del aprendiz en talleres y laboratorios?',
    category: 'Deberes Institucionales',
    options: [
      'Utilizar los Elementos de Protección Personal (EPP) y acatar estrictamente los protocolos de bioseguridad y prevención de riesgos.',
      'Decidir autónomamente si utiliza o no las botas de seguridad según la temperatura del ambiente.',
      'Operar maquinaria industrial aun cuando no haya recibido la inducción de seguridad respectiva.',
      'Retirar las guardas de seguridad de las máquinas para agilizar los trabajos prácticos.'
    ],
    correctIndex: 0,
    explanation: 'El uso obligatorio de Elementos de Protección Personal (EPP) y la sujeción a normas SST previenen accidentes y son de obligatorio cumplimiento por ley y reglamento.',
    positivePraise: '¡Excelente conciencia de autocuidado! La seguridad y los EPP son innegociables en los ambientes SENA.',
    correctionTip: 'Identifica tu error: Los EPP y protocolos de seguridad industrial son de uso estricto y obligatorio; obviarlos pone en riesgo tu vida y la de tus compañeros.'
  },
  {
    id: 10,
    sectionKey: 'deberes',
    sectionTitle: 'Sección 2: Deberes Institucionales (Capítulo III)',
    question: 'En el desarrollo de guías y entrega de evidencias de aprendizaje, ¿qué deber ético rige al aprendiz?',
    category: 'Deberes Institucionales',
    options: [
      'Descargar trabajos de internet y presentarlos como propios siempre y cuando no los descubran.',
      'Respetar los derechos de autor, citar las fuentes bibliográficas según normas técnicas y actuar con honestidad académica.',
      'Pagar a un tercero para que elabore los códigos, planos o ensayos del proyecto formativo.',
      'Compartir sus contraseñas de Zajuna para que otros aprendices suban evidencias en su cuenta.'
    ],
    correctIndex: 1,
    explanation: 'El SENA promueve la integridad y ética profesional. El respeto a los derechos de autor y la producción intelectual propia son deberes fundamentales contra el fraude y el plagio.',
    positivePraise: '¡Magnífico! La honestidad intelectual es la base del profesional ético que transforma el país.',
    correctionTip: 'Identifica tu error: El plagio o suplantación de autoría destruye el aprendizaje real y constituye falta académica y disciplinaria grave.'
  },

  // ==========================================
  // SECCIÓN 3: PROHIBICIONES DEL APRENDIZ (5 PREGUNTAS)
  // ==========================================
  {
    id: 11,
    sectionKey: 'prohibiciones',
    sectionTitle: 'Sección 3: Prohibiciones del Aprendiz (Capítulo IV)',
    question: '¿Cuál de las siguientes acciones está expresamente PROHIBIDA en el Reglamento del Aprendiz respecto al consumo de sustancias?',
    category: 'Prohibiciones del Aprendiz',
    options: [
      'Consumir agua embotellada durante las pausas activas.',
      'Ingresar, comercializar o consumir bebidas alcohólicas, cigarrillo o sustancias psicoactivas dentro de los centros o ambientes formativos.',
      'Consumir alimentos en las zonas de cafetería designadas por el Centro de Formación.',
      'Portar medicamentos formulados por un médico con su respectiva prescripción.'
    ],
    correctIndex: 1,
    explanation: 'El Capítulo IV prohíbe terminantemente ingresar bajo el efecto o consumir alcohol, estupefacientes o sustancias alucinógenas en cualquier instalación del SENA o eventos institucionales.',
    positivePraise: '¡Correcto! Los ambientes SENA son espacios de convivencia pacífica, aprendizaje y cero tolerancia a sustancias ilícitas o alcohol.',
    correctionTip: 'Identifica tu error: Consumir o ingresar bebidas alcohólicas o psicoactivas es una prohibición expresa de carácter gravísimo en el SENA.'
  },
  {
    id: 12,
    sectionKey: 'prohibiciones',
    sectionTitle: 'Sección 3: Prohibiciones del Aprendiz (Capítulo IV)',
    question: '¿Qué prohibición reglamentaria existe sobre el porte de objetos dentro de las instalaciones del SENA?',
    category: 'Prohibiciones del Aprendiz',
    options: [
      'Portar cuadernos, calculadoras o computadores portátiles para el estudio.',
      'Ingresar o portar armas de fuego, armas blancas, explosivos o cualquier objeto punzocortante que amenace la seguridad colectiva.',
      'Portar herramientas autorizadas en la maleta con el visto bueno del instructor de taller.',
      'Portar dispositivos de memoria USB para guardar archivos de clase.'
    ],
    correctIndex: 1,
    explanation: 'Portar cualquier tipo de arma de fuego, traumática, cortopunzante o artefacto explosivo está estrictamente prohibido y da lugar a sanción inmediata y aviso a autoridades.',
    positivePraise: '¡Muy bien! La seguridad y protección de la vida es una prioridad absoluta en la comunidad del SENA.',
    correctionTip: 'Identifica tu error: El porte de cualquier tipo de arma vulnera la seguridad del centro y constituye causal inmediata de proceso sancionatorio grave.'
  },
  {
    id: 13,
    sectionKey: 'prohibiciones',
    sectionTitle: 'Sección 3: Prohibiciones del Aprendiz (Capítulo IV)',
    question: 'Respecto a las plataformas digitales institucionales (Zajuna, SOFIA Plus), ¿qué conducta constituye una prohibición explícita?',
    category: 'Prohibiciones del Aprendiz',
    options: [
      'Modificar la foto de perfil del aprendiz con una imagen personal adecuada.',
      'Suplantar identidades, compartir credenciales de acceso o intentar vulnerar la seguridad informática institucional.',
      'Consultar las notas y juicios evaluativos emitidos por los instructores.',
      'Enviar evidencias de aprendizaje dentro de los plazos fijados en la plataforma.'
    ],
    correctIndex: 1,
    explanation: 'La suplantación de identidad en plataformas digitales, el ciberataque o la alteración indebida de bases de datos son faltas disciplinarias gravísimas tipificadas en el reglamento.',
    positivePraise: '¡Excelente discernimiento! La seguridad de la información y la autenticidad de las credenciales protegen tu hoja de vida.',
    correctionTip: 'Identifica tu error: Las credenciales son personales e intransferibles; vulnerar plataformas o suplantar aprendices acarrea consecuencias disciplinarias y legales.'
  },
  {
    id: 14,
    sectionKey: 'prohibiciones',
    sectionTitle: 'Sección 3: Prohibiciones del Aprendiz (Capítulo IV)',
    question: '¿Qué prohibición reglamentaria aplica sobre actividades comerciales y políticas dentro de las sedes de formación?',
    category: 'Prohibiciones del Aprendiz',
    options: [
      'Organizar debates pedagógicos sobre temas económicos del país en el aula de clase.',
      'Realizar ventas informales, rifas, juegos de azar no autorizados o proselitismo político partidista dentro de los ambientes SENA.',
      'Participar en la feria de emprendimiento institucional de Fondo Emprender.',
      'Promover campañas de recolección de residuos para proyectos de reciclaje aprobados por el centro.'
    ],
    correctIndex: 1,
    explanation: 'El reglamento prohíbe comercializar productos, realizar rifas, apuestas de dinero o proselitismo político partidista que desvíen la misión educativa del SENA.',
    positivePraise: '¡Perfecto! Los ambientes formativos deben mantener su propósito misional libre de actividades comerciales no autorizadas o proselitismo.',
    correctionTip: 'Identifica tu error: Las actividades lucrativas informales o proselitismo político están expresamente vedadas en los espacios de aprendizaje del SENA.'
  },
  {
    id: 15,
    sectionKey: 'prohibiciones',
    sectionTitle: 'Sección 3: Prohibiciones del Aprendiz (Capítulo IV)',
    question: 'En cuanto al trato interpersonal y convivencia, ¿cuál de los siguientes actos está rotundamente prohibido?',
    category: 'Prohibiciones del Aprendiz',
    options: [
      'Expresar desacuerdos académicos de manera respetuosa y argumentada ante el grupo.',
      'Cometer actos de acoso, intimidación (bullying), agresión verbal, física o ciberacoso hacia aprendices, instructores o colaboradores.',
      'Solicitar a un compañero que baje el volumen de su música durante el trabajo en equipo.',
      'Dialogar pacíficamente con el instructor sobre dudas en una calificación.'
    ],
    correctIndex: 1,
    explanation: 'Cualquier manifestación de violencia, discriminación, acoso sexual, matoneo o agresión verbal o física atenta contra los derechos humanos y el reglamento.',
    positivePraise: '¡Totalmente acertado! El respeto irrestricto y la sana convivencia son pilares de la cultura SENA.',
    correctionTip: 'Identifica tu error: El debate respetuoso es un derecho; la violencia, el acoso o la intimidación son prohibiciones severamente sancionadas.'
  },

  // ==========================================
  // SECCIÓN 4: FALTAS ACADÉMICAS Y DISCIPLINARIAS (5 PREGUNTAS)
  // ==========================================
  {
    id: 16,
    sectionKey: 'faltas',
    sectionTitle: 'Sección 4: Faltas Académicas y Disciplinarias (Capítulo V)',
    question: '¿Cómo diferencia el reglamento del SENA las faltas académicas de las faltas disciplinarias?',
    category: 'Faltas del Aprendiz',
    options: [
      'Las académicas se refieren al incumplimiento en evidencias, aprendizajes y competencias; las disciplinarias a la conducta y normas de convivencia.',
      'Las académicas ocurren fuera del centro y las disciplinarias dentro del centro.',
      'Las faltas disciplinarias solo aplican a instructores y las académicas a aprendices.',
      'No existe diferencia alguna; ambas se sancionan con el pago de una multa económica.'
    ],
    correctIndex: 0,
    explanation: 'El Capítulo V establece que las faltas académicas se originan en el no logro o incumplimiento de evidencias y competencias, mientras que las disciplinarias derivan de conductas que vulneran la convivencia y deberes institucionales.',
    positivePraise: '¡Excelente comprensión doctrinal! Distinguir el ámbito pedagógico del convivencial es clave en tu formación.',
    correctionTip: 'Identifica tu error: Las académicas atañen al aprendizaje y evidencias (Saber y Saber Hacer); las disciplinarias a la convivencia institucional (Saber Ser).'
  },
  {
    id: 17,
    sectionKey: 'faltas',
    sectionTitle: 'Sección 4: Faltas Académicas y Disciplinarias (Capítulo V)',
    question: '¿Cuáles son los criterios reglamentarios para calificar una falta como LEVE, GRAVE o GRAVÍSIMA?',
    category: 'Faltas del Aprendiz',
    options: [
      'La edad del aprendiz y su promedio de notas en el colegio.',
      'La reiteración de la conducta, el grado de intencionalidad, el daño causado a la comunidad y la afectación al proceso formativo.',
      'El criterio personal exclusivo del vigilante de turno en la portería.',
      'Si la falta ocurrió en horario diurno o nocturno únicamente.'
    ],
    correctIndex: 1,
    explanation: 'El Comité califica las faltas ponderando la gravedad del daño, si hubo dolo (intención) o culpa, la reincidencia, la confabulación y el impacto sobre bienes o personas.',
    positivePraise: '¡Gran conocimiento normativo! La proporcionalidad y los criterios objetivos rigen las decisiones del Comité.',
    correctionTip: 'Identifica tu error: Las faltas se ponderan por intencionalidad, reiteración, daño causado y grado de perturbación institucional, no por factores subjetivos.'
  },
  {
    id: 18,
    sectionKey: 'faltas',
    sectionTitle: 'Sección 4: Faltas Académicas y Disciplinarias (Capítulo V)',
    question: '¿En cuál de las siguientes situaciones se configura formalmente la causal de DESERCIÓN del proceso formativo?',
    category: 'Faltas del Aprendiz',
    options: [
      'Cuando el aprendiz solicita un permiso justificado de 1 día por calamidad médica comprobada.',
      'Cuando acumula 3 días continuos de inasistencia injustificada o no reanuda tras culminar un aplazamiento autorizado.',
      'Cuando no asiste a una salida pedagógica voluntaria de fin de semana.',
      'Cuando pierde una sola evaluación y solicita plan de mejoramiento pedagógico.'
    ],
    correctIndex: 1,
    explanation: 'Se tipifica deserción cuando el aprendiz acumula 3 días hábiles consecutivos de inasistencia sin justificación válida, o no se presenta al finalizar su aplazamiento.',
    positivePraise: '¡Totalmente acertado! Cuidar la asistencia constante protege la continuidad de tu matrícula en el SENA.',
    correctionTip: 'Identifica tu error: La deserción opera ante inasistencias injustificadas reiteradas (3 días consecutivos) o abandono del proceso, no ante permisos soportados.'
  },
  {
    id: 19,
    sectionKey: 'faltas',
    sectionTitle: 'Sección 4: Faltas Académicas y Disciplinarias (Capítulo V)',
    question: 'El plagio en evidencias o la copia durante una prueba evaluativa, ¿cómo es calificado en el marco disciplinario SENA?',
    category: 'Faltas del Aprendiz',
    options: [
      'Como una falta leve que se soluciona borrando la evidencia.',
      'Como una falta que anula la evidencia y constituye falta grave o gravísima que da inicio a proceso disciplinario.',
      'Como un derecho de autor compartido entre el aprendiz y la página web consultada.',
      'Como una falta que solo se sanciona si el autor original reside en Colombia.'
    ],
    correctIndex: 1,
    explanation: 'El fraude y el plagio vulneran la propiedad intelectual y la ética formativa; conllevan la no aprobación del resultado y remisión al Comité de Evaluación y Seguimiento.',
    positivePraise: '¡Brillante! El rigor ético en tus evidencias es el sello de calidad de un egresado SENA respetado.',
    correctionTip: 'Identifica tu error: El fraude anula el juicio evaluativo e inicia trámite disciplinario formal por vulneración a la integridad académica.'
  },
  {
    id: 20,
    sectionKey: 'faltas',
    sectionTitle: 'Sección 4: Faltas Académicas y Disciplinarias (Capítulo V)',
    question: 'El daño intencional, sabotaje o destrucción de maquinaria, instalaciones o plataformas del Centro, ¿cómo se tipifica reglamentariamente?',
    category: 'Faltas del Aprendiz',
    options: [
      'Falta gravísima disciplinaria que da lugar a cancelación de matrícula y posible denuncia penal ante la Fiscalía.',
      'Una travesura estudiantil sin consecuencias en la hoja de vida académica.',
      'Un accidente laboral cubierto automáticamente por la póliza sin investigación.',
      'Una falta académica leve subsanable con un resumen escrito sobre cuidado ambiental.'
    ],
    correctIndex: 0,
    explanation: 'El daño intencional a bienes del Estado es falta gravísima disciplinaria, sancionable con cancelación de matrícula y reporte a las autoridades judiciales competentes.',
    positivePraise: '¡Muy bien! Los bienes públicos del SENA son para la educación de todos los colombianos y su destrucción acarrea severas consecuencias.',
    correctionTip: 'Identifica tu error: El daño intencional o sabotaje no es una falta leve; es gravísima, acarrea cancelación de matrícula y acciones legales.'
  },

  // ==========================================
  // SECCIÓN 5: MEDIDAS FORMATIVAS Y SANCIONES (5 PREGUNTAS)
  // ==========================================
  {
    id: 21,
    sectionKey: 'medidas',
    sectionTitle: 'Sección 5: Medidas Formativas, Sanciones y Debido Proceso (Capítulos VI y VII)',
    question: '¿Cuál de las siguientes es una MEDIDA FORMATIVA (pedagógica) contemplada en el reglamento para apoyar al aprendiz?',
    category: 'Medidas Formativas',
    options: [
      'La cancelación definitiva de la matrícula con sanción de 2 años en el sistema.',
      'El Llamado de Atención Verbal o la concertación de un Plan de Mejoramiento Académico o Disciplinario.',
      'El cobro de intereses monetarios sobre los apoyos de sostenimiento recibidos.',
      'La expulsión inmediata del aula sin derecho a réplica ni descargos.'
    ],
    correctIndex: 1,
    explanation: 'Las medidas formativas tienen carácter preventivo y pedagógico: incluyen el llamado de atención verbal y los planes de mejoramiento concertados con metas claras.',
    positivePraise: '¡Excelente! Las medidas formativas buscan orientar y potenciar tus competencias, no castigarte.',
    correctionTip: 'Identifica tu error: La cancelación es una sanción máxima. Las medidas formativas son pedagógicas: llamado de atención verbal y plan de mejoramiento.'
  },
  {
    id: 22,
    sectionKey: 'medidas',
    sectionTitle: 'Sección 5: Medidas Formativas, Sanciones y Debido Proceso (Capítulos VI y VII)',
    question: 'Cuando a un aprendiz se le impone la sanción de CONDICIONAMIENTO DE MATRÍCULA, ¿cuáles son sus implicaciones reglamentarias?',
    category: 'Medidas y Sanciones',
    options: [
      'Debe continuar su formación pero pierde transitoriamente beneficios como apoyos de sostenimiento e inhabilidad para representar al SENA.',
      'Queda expulsado de por vida de cualquier entidad del Estado colombiano.',
      'Debe pagar la nómina del instructor durante el tiempo que dure la medida.',
      'No puede volver a ingresar a la biblioteca ni a los ambientes virtuales.'
    ],
    correctIndex: 0,
    explanation: 'El condicionamiento es una sanción donde el aprendiz continúa en formación bajo estricto seguimiento, perdiendo temporalmente estímulos, apoyos o representatividad.',
    positivePraise: '¡Muy bien! El condicionamiento es una última oportunidad de rectificación antes de una eventual cancelación.',
    correctionTip: 'Identifica tu error: El condicionamiento no te expulsa del SENA; te mantiene en formación pero restringe estímulos mientras corriges tu conducta.'
  },
  {
    id: 23,
    sectionKey: 'medidas',
    sectionTitle: 'Sección 5: Medidas Formativas, Sanciones y Debido Proceso (Capítulos VI y VII)',
    question: 'En caso de aplicarse la sanción máxima de CANCELACIÓN DE MATRÍCULA, ¿cuál es el periodo de inhabilidad que establece el reglamento?',
    category: 'Medidas y Sanciones',
    options: [
      '1 semana sin poder entrar a Zajuna.',
      'De 6 meses a 2 años sin poder inscribirse ni ingresar a programas de formación titulada en el SENA.',
      '10 años en cualquier universidad privada del país.',
      'No hay ninguna inhabilidad; puede inscribirse al día siguiente en otra ficha.'
    ],
    correctIndex: 1,
    explanation: 'La cancelación de matrícula conlleva la pérdida del cupo institucional y una inhabilidad para ingresar a formación titulada de seis (6) meses a dos (2) años según la gravedad de la falta.',
    positivePraise: '¡Gran precisión! Conocer las consecuencias de la cancelación refuerza el compromiso y responsabilidad con tu cupo formativo.',
    correctionTip: 'Identifica tu error: La cancelación implica sanción formal en SOFIA Plus de 6 meses a 2 años de inhabilidad para inscribirse en programas titulados.'
  },
  {
    id: 24,
    sectionKey: 'medidas',
    sectionTitle: 'Sección 5: Medidas Formativas, Sanciones y Debido Proceso (Capítulos VI y VII)',
    question: '¿Qué órgano institucional del Centro de Formación tiene la función de analizar los casos y recomendar medidas al Subdirector de Centro?',
    category: 'Medidas y Sanciones',
    options: [
      'La Junta de Vecinos del barrio donde queda ubicado el centro.',
      'El Comité de Evaluación y Seguimiento, integrado por instructores, vocero de aprendices, bienestar y coordinación.',
      'El departamento de compras y contratación de la regional.',
      'La empresa privada donde el aprendiz aspira a realizar su contrato de aprendizaje.'
    ],
    correctIndex: 1,
    explanation: 'El Comité de Evaluación y Seguimiento es el cuerpo colegiado encargado de estudiar los informes, escuchar los descargos del aprendiz y recomendar al Subdirector las medidas formativas o sancionatorias.',
    positivePraise: '¡Exacto! El Comité es un espacio colegiado que garantiza el debate plural, la voz estudiantil y el debido proceso.',
    correctionTip: 'Identifica tu error: El órgano competente es el Comité de Evaluación y Seguimiento de Centro, donde participa también el vocero de aprendices.'
  },
  {
    id: 25,
    sectionKey: 'medidas',
    sectionTitle: 'Sección 5: Medidas Formativas, Sanciones y Debido Proceso (Capítulos VI y VII)',
    question: 'Si un aprendiz es notificado de una sanción formal mediante acto administrativo emitido por el Subdirector, ¿qué recurso legal puede interponer y en qué plazo?',
    category: 'Medidas y Sanciones',
    options: [
      'Ninguno; las decisiones del Subdirector son inapelables en cualquier circunstancia.',
      'Recurso de Reposición dentro de los cinco (5) días hábiles siguientes a la notificación formal del acto.',
      'Demanda penal en la Corte Constitucional dentro del año siguiente.',
      'Petición informal en redes sociales del Centro de Formación.'
    ],
    correctIndex: 1,
    explanation: 'Contra el acto administrativo que impone una sanción procede el Recurso de Reposición ante el mismo Subdirector de Centro, dentro de los cinco (5) días hábiles siguientes a la notificación formal.',
    positivePraise: '¡Impecable conocimiento jurídico! Conoces tus plazos legales para ejercer tu derecho a la defensa y contradicción.',
    correctionTip: 'Identifica tu error: Procede el Recurso de Reposición dentro de los 5 días hábiles siguientes a la notificación, garantizando la doble vía del debido proceso.'
  }
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Resultado de Aprendizaje (RAP)',
    acronym: 'RAP',
    category: 'Académico',
    definition: 'Indicador de lo que el aprendiz sabe, comprende y es capaz de hacer al culminar un periodo o competencia de formación.',
    example: 'Ejemplo: "RAP 01: Especificar los requerimientos del software según necesidades del cliente".'
  },
  {
    term: 'FPI (Formación Profesional Integral)',
    acronym: 'FPI',
    category: 'Institucional',
    definition: 'Enfoque pedagógico del SENA orientado al desarrollo holístico de la persona, articulando lo técnico, lo humano, lo social y lo productivo.'
  },
  {
    term: 'Ficha de Caracterización',
    acronym: 'Ficha',
    category: 'Académico',
    definition: 'Número único de identificación institucional asignado a cada grupo de aprendices que cursan un programa formativo determinado (ej. Ficha 2834921).'
  },
  {
    term: 'Guía de Aprendizaje',
    category: 'Académico',
    definition: 'Recurso didáctico elaborado por los instructores que orienta al aprendiz paso a paso en las actividades de reflexión inicial, contextualización, apropiación y transferencia del conocimiento.'
  },
  {
    term: 'Juicio Evaluativo',
    category: 'Académico',
    definition: 'Estado que emite el instructor sobre el logro de un resultado de aprendizaje: "A" (Aprobado) o "D" (No Aprobado/Por Mejorar).'
  },
  {
    term: 'Plan de Mejoramiento',
    category: 'Reglamento',
    definition: 'Medida pedagógica concertada entre instructor y aprendiz para subsanar debilidades en competencias no alcanzadas o corregir faltas disciplinarias leves.'
  },
  {
    term: 'Zajuna',
    category: 'Plataformas',
    definition: 'Sistema de gestión de aprendizaje (LMS) oficial del SENA donde se alojan los cursos virtuales, guías, foros y evidencias.'
  },
  {
    term: 'SOFIA Plus',
    category: 'Plataformas',
    definition: 'Sistema Optimizado para la Formación Integral del Aprendizaje activo; plataforma administrativa del SENA para matrículas, hojas de vida y certificados.'
  },
  {
    term: 'Contrato de Aprendizaje',
    category: 'Institucional',
    definition: 'Forma especial de vinculación al derecho laboral mediante la cual una persona recibe formación integral con patrocinio económico de una empresa durante su formación y práctica.'
  },
  {
    term: 'SENNOVA',
    category: 'Institucional',
    definition: 'Sistema de Investigación, Desarrollo Tecnológico e Innovación del SENA que financia y apoya proyectos de ciencia aplicada y semilleros de investigación.'
  }
];
