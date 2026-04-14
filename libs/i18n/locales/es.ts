const es = {
  onboarding: {
    step1: {
      title: 'Dinero sin estrés',
      subtitle: 'Una manera simple de entender, planificar y manejar tu dinero.',
    },
    step2: {
      title: 'Tus datos son tuyos',
      subtitle:
        'No recopilamos ninguno de tus datos. Todo queda privado, seguro y únicamente en tu dispositivo.',
    },
    step3: {
      title: '¿Cómo querés organizar tu dinero?',
      subtitle: 'Elegí la opción que mejor se ajuste a tu situación financiera ahora.',
      personal: { title: 'Presupuesto Personal', description: 'Para llevar tus propias finanzas.' },
      shared: {
        title: 'Presupuesto Compartido',
        description: 'Para parejas o compañeros de casa',
      },
    },
    step4: {
      title: 'Elige tu moneda',
      subtitle: 'Elegí la moneda que usás en el día a día.',
    },
    step5: {
      title: '¿Cuál es tu ingreso mensual?',
      subtitle: 'Así podemos mostrarte cuánto te queda disponible cada mes.',
    },
    step6: {
      title: '¿Cuál es tu objetivo principal?',
      subtitle: 'Así adaptamos la app a lo que necesitás.',
      plan: {
        title: 'Planificar mis gastos mensuales',
        description: 'Llevar el control de facturas y gastos fijos.',
      },
      daily: {
        title: 'Registrar gastos diarios',
        description: 'Saber exactamente en qué gastas tu dinero.',
      },
      savings: { title: 'Ahorrar más', description: 'Empezar a guardar para el futuro.' },
      other: { title: 'Otro', description: 'Todavía no tengo un objetivo claro.' },
    },
    actions: {
      getStarted: 'Empezar',
      gotIt: '¡Entendido!',
      next: 'Siguiente',
      confirmAndSave: 'Confirmar y guardar',
    },
    legal: {
      disclaimer: 'Al continuar aceptás nuestros',
      terms: 'Términos y Condiciones',
      and: 'y',
      privacy: 'Política de Privacidad',
    },
  },
  success: {
    title: '¡Todo listo!',
    subtitle: 'Ya está todo preparado para ayudarte a alcanzar tus metas.',
    goToDashboard: '¡Empecemos!',
  },
  home: {
    remainingBudget: 'Presupuesto mensual restante',
    income: 'Ingresos: {{amount}}',
    spent: 'Gastado: {{amount}}',
    recentTransactions: 'Transacciones recientes',
    emptyState: {
      title: '¿Listo para arrancar?',
      subtitle:
        'Todo empieza con una sola transacción. Registrá un gasto y empezá a ver cómo va tu dinero.',
      button: 'Registrá tu primera transacción',
    },
  },
  stats: {
    title: 'Estadísticas',
    empty: 'Aquí aparecerá un resumen de tus gastos.',
  },
  budget: {
    title: 'Presupuesto',
    empty: 'Aquí puedes manejar tu presupuesto.',
  },
  settings: {
    title: 'Configuración',
    account: {
      title: 'Cuenta',
      currency: { title: 'Moneda', description: 'La moneda que se muestra en la app' },
      monthlyIncome: { title: 'Ingreso Mensual', description: 'Tu ingreso mensual de referencia' },
    },
    preferences: {
      title: 'Preferencias',
      categories: {
        title: 'Categorías',
        description: 'Organizá tus categorías de gastos e ingresos',
      },
      language: { title: 'Idioma', description: 'Cambiar idioma de la app' },
    },
    legal: {
      title: 'Legal',
      privacy: { title: 'Política de Privacidad', description: 'Cómo manejamos tus datos' },
      terms: { title: 'Términos y Condiciones', description: 'Condiciones de uso de Franky' },
    },
    clearData: {
      button: 'Borrar todos mis datos',
      modal: {
        title: 'Esto no tiene vuelta atrás',
        description:
          'Se va a borrar todo tu historial, incluidas las categorías personalizadas. Hacelo solo si querés empezar desde cero.',
        confirm: 'Borrar todo',
      },
      deleting: {
        title: 'Borrando todos tus datos...',
        subtitle: 'Solo va a tardar un momento',
      },
      deleted: {
        title: '¡Todo borrado!',
        subtitle: 'Te estamos llevando al inicio',
      },
    },
  },
  language: {
    title: 'Idioma',
    subtitle: 'Elegí tu idioma preferido',
    en: 'English',
    es: 'Español',
  },
  transaction: {
    category: 'Categoría',
    totalAmount: 'Monto total',
    placeholder: '$ 0.00',
    expense: 'Gasto',
    income: 'Ingreso',
    date: 'Fecha',
    notes: 'Notas',
    notesPlaceholder: '¿En qué lo gastaste? Agregá una nota si querés...',
    submit: 'Agregar transacción',
    success: {
      title: 'Transacción guardada',
      description: 'Todo listo. Podés ver tu saldo actualizado en el panel.',
    },
    error: {
      title: 'Error al guardar',
      description: 'Algo salió mal. Intentá de nuevo en un momento.',
    },
    noTransactions: 'No hay transacciones',
    today: 'Hoy',
    yesterday: 'Ayer',
  },
  category: {
    add: {
      title: 'Nueva Categoría',
      subtitle: 'Dale tu toque personal a la app',
      nameLabel: 'Nombre de categoría',
      namePlaceholder: '¿Cómo se llama esta categoría?',
      chooseColor: 'Elegir color',
      tapToChangeIcon: 'Tocá para cambiar el ícono',
      creating: 'Creando...',
      create: 'Crear categoría',
      defaultName: 'Categoría',
      error: 'No se pudo crear la categoría. Intentá de nuevo.',
    },
    all: {
      title: 'Categorías',
      income: 'Ingresos',
      expense: 'Gastos',
      both: 'Ingresos y Gastos',
      empty: 'No hay categorías',
      addNew: 'Agregar nueva categoría',
    },
  },
  currency: {
    update: {
      title: 'Cambiá tu moneda principal',
      subtitle: 'Elegí la moneda que usás en el día a día.',
      save: 'Guardar',
      saving: 'Guardando...',
      error: 'No se pudo actualizar la moneda. Intentá de nuevo.',
    },
    names: {
      argentinePeso: 'Peso Argentino',
      euro: 'Euro',
      dollar: 'Dólar Estadounidense',
      pound: 'Libra Esterlina',
      yen: 'Yen Japonés',
      rupee: 'Rupia India',
    },
  },
  income: {
    update: {
      title: '¿Cuál es tu ingreso mensual?',
      subtitle: 'Así podemos mostrarte cuánto te queda disponible cada mes.',
      save: 'Guardar',
      saving: 'Guardando...',
      error: 'No se pudo guardar el ingreso. Intentá de nuevo.',
    },
  },
  calendar: {
    today: 'Hoy',
    oneDayAgo: 'Hace 1 día',
    twoDaysAgo: 'Hace 2 días',
    saveDate: 'Guardar fecha',
  },
  iconPicker: {
    title: 'Elegir ícono',
    searchPlaceholder: 'Buscar íconos...',
  },
  colorPicker: {
    title: 'Elegir color',
    selectButton: 'Seleccionar color',
  },
  privacy: {
    title: 'Política de Privacidad',
    lastUpdated: 'Última actualización: Abril 2025',
    intro:
      'Franky es una app de finanzas personales diseñada para ayudarte a gestionar tus ingresos, gastos y presupuesto. Tu privacidad nos importa. Esta política explica qué datos recopilamos, cómo los usamos y qué derechos tenés.',
    sections: {
      infoCollected: {
        title: '1. Información que recopilamos',
        body: 'Franky almacena todos tus datos financieros — transacciones, categorías, presupuestos y configuraciones — de forma local en tu dispositivo, usando una base de datos SQLite encriptada. No subimos tu información financiera a ningún servidor externo.\n\nRecopilamos datos de uso limitados y anónimos para mejorar la experiencia de la app. Esto incluye:\n- Eventos de la app (por ejemplo, pantallas visitadas y funciones usadas)\n- Reportes de errores y fallos\n- Tipo de dispositivo, versión del sistema operativo y versión de la app',
      },
      analytics: {
        title: '2. Análisis',
        body: 'Usamos PostHog para recopilar datos anónimos sobre cómo los usuarios interactúan con Franky. Esta información nos ayuda a entender qué funciones son más útiles y dónde hay margen de mejora. No se envía ningún dato personal identificable (PII) a PostHog.',
      },
      errorTracking: {
        title: '3. Seguimiento de errores',
        body: 'Usamos Sentry para capturar reportes de fallos y errores. Cuando la app encuentra un problema inesperado, se envía información de diagnóstico (trazas de pila, datos del dispositivo, estado de la app) a Sentry para ayudarnos a identificarlo y resolverlo rápidamente. Estos datos no incluyen tu información financiera.',
      },
      dataStorage: {
        title: '4. Almacenamiento y seguridad de datos',
        body: 'Todos tus datos financieros se guardan exclusivamente en tu dispositivo. No tenemos acceso a tus transacciones, categorías, saldos ni a ningún otro registro financiero personal. Si eliminás la app, todos los datos almacenados localmente se borran de forma permanente.',
      },
      thirdParty: {
        title: '5. Servicios de terceros',
        body: 'Franky integra los siguientes servicios de terceros:\n- PostHog — análisis anónimos\n- Sentry — reportes de errores y fallos\n\nCada servicio opera bajo su propia política de privacidad. Te recomendamos revisarlas para más información.',
      },
      children: {
        title: '6. Privacidad de menores',
        body: 'Franky no está dirigido a menores de 13 años. No recopilamos datos de niños de forma consciente. Si creés que un menor usó la app y compartió datos personales, contáctanos para que podamos ocuparnos del tema.',
      },
      yourRights: {
        title: '7. Tus derechos',
        body: 'Como todos los datos financieros se almacenan localmente en tu dispositivo, tenés control total sobre ellos. Podés borrarlos en cualquier momento desde la pantalla de Configuración. Si tenés dudas sobre los datos de análisis anónimos, podés contactarnos directamente.',
      },
      changes: {
        title: '8. Cambios a esta política',
        body: 'Podemos actualizar esta Política de Privacidad de vez en cuando. Cuando lo hagamos, actualizaremos la fecha de "Última actualización" en la parte superior de esta página. Si seguís usando Franky después de los cambios, significa que aceptás la política actualizada.',
      },
      contact: {
        title: '9. Contacto',
        body: 'Si tenés preguntas o inquietudes sobre esta Política de Privacidad, comunicate con nosotros a través de los canales de soporte de la app.',
      },
    },
  },
  terms: {
    title: 'Términos y Condiciones',
    lastUpdated: 'Última actualización: Abril 2025',
    intro:
      'Por favor leé estos Términos y Condiciones antes de usar Franky. Al acceder o usar la app, aceptás estar sujeto a estas condiciones.',
    sections: {
      acceptance: {
        title: '1. Aceptación de los términos',
        body: 'Al descargar, instalar o usar Franky, confirmás que tenés al menos 13 años y que aceptás estos Términos y Condiciones. Si no estás de acuerdo, por favor dejá de usar la app.',
      },
      description: {
        title: '2. Descripción del servicio',
        body: 'Franky es una app de seguimiento de finanzas personales que te permite registrar transacciones, gestionar categorías, establecer presupuestos y ver tus hábitos de gasto. Todos los datos se almacenan localmente en tu dispositivo. Franky no se conecta a tus cuentas bancarias ni a ninguna institución financiera.',
      },
      userResponsibilities: {
        title: '3. Responsabilidades del usuario',
        body: 'Sos el único responsable de la exactitud de los datos que ingresás en Franky. La app es una herramienta de apoyo para la gestión financiera personal — no reemplaza el asesoramiento de un profesional. Aceptás no hacer un mal uso de la app ni intentar interferir con su funcionamiento.',
      },
      noFinancialAdvice: {
        title: '4. Sin asesoramiento financiero',
        body: 'La información y las funciones de Franky son únicamente para fines informativos y organizativos. Nada en la app constituye asesoramiento financiero, legal, fiscal o de inversión. Siempre consultá a un profesional calificado para decisiones relacionadas con tus finanzas.',
      },
      ip: {
        title: '5. Propiedad intelectual',
        body: 'Todo el contenido, diseño, código y marca de Franky son propiedad intelectual de los desarrolladores. No podés reproducir, distribuir ni crear obras derivadas de ninguna parte de la app sin autorización escrita.',
      },
      warranty: {
        title: '6. Exclusión de garantías',
        body: 'Franky se ofrece "tal cual" y "según disponibilidad", sin garantías de ningún tipo, expresas ni implícitas. No garantizamos que la app esté libre de errores, funcione sin interrupciones ni esté libre de vulnerabilidades. Usala bajo tu propio riesgo.',
      },
      liability: {
        title: '7. Limitación de responsabilidad',
        body: 'En la medida permitida por la ley, los desarrolladores de Franky no serán responsables de ningún daño indirecto, incidental, especial o consecuente derivado del uso de la app, incluyendo pérdida de datos o pérdidas económicas.',
      },
      privacy: {
        title: '8. Datos y privacidad',
        body: 'El uso de Franky también está regido por nuestra Política de Privacidad, que forma parte de estos Términos. Al usar la app, aceptás las prácticas de datos descritas en dicha política.',
      },
      termination: {
        title: '9. Finalización',
        body: 'Podés dejar de usar Franky en cualquier momento desinstalando la app. Nos reservamos el derecho de discontinuar o modificar la app sin previo aviso. Al desinstalarla, todos los datos almacenados localmente se eliminarán de tu dispositivo.',
      },
      changes: {
        title: '10. Cambios a estos términos',
        body: 'Podemos revisar estos Términos y Condiciones periódicamente. La fecha de "Última actualización" refleja la revisión más reciente. Si seguís usando la app después de los cambios, significa que aceptás los términos actualizados.',
      },
      governingLaw: {
        title: '11. Ley aplicable',
        body: 'Estos Términos se rigen e interpretan de acuerdo con las leyes aplicables. Cualquier conflicto derivado de estos Términos o del uso de Franky se resolverá mediante negociación de buena fe o, si fuera necesario, a través de los tribunales competentes.',
      },
      contact: {
        title: '12. Contacto',
        body: 'Si tenés preguntas sobre estos Términos y Condiciones, comunicate con nosotros a través de los canales de soporte de la app.',
      },
    },
  },
} as const;

export default es;
