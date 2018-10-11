$('#selectLanguageDropdown').localizationTool({
    'defaultLanguage' : 'en_GB', /* (optional) although must be defined if you don't want en_GB */
    'showFlag': true,            /* (optional) show/hide the flag */
    'showCountry': true,         /* (optional) show/hide the country name */
    'showLanguage': true,        /* (optional) show/hide the country language */
    'languages' : {              /* (optional) define **ADDITIONAL** custom languages */
    },
    /* 
     * Translate your strings below
     */
    'strings' : {
        /*
         * Example with id. NOTE: ids have priority over any other
         * selector in the translation.
         */
        'id:welcomeText': {
            'es_ES' : 'Spanish translation here'
        },
        'id:buyTitle': {
            'es_ES' : 'Comprar'
        },
        'id:buySubtitle': {
            'es_ES' : '&nbsp;| Manos Fuertes',
        },
        'id:buyMessage': {
            'es_ES' : '¡Empieza aqui! Comprar y ganar',
        }
    }
});

// end of step-by-step guide