module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // No mostrar el contexto en el navegador después de las pruebas
    },
    jasmineHtmlReporter: {
      suppressAll: true // Evita el exceso de reportes en la consola
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'lcovonly', subdir: 'report-lcov' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true,
    files: [
      // Aquí incluimos todos los archivos relevantes para Karma, no solo el archivo de prueba individual
      'src/**/*.ts',             // Incluye todos los archivos TypeScript
      'src/**/*.spec.ts'         // Incluye todos los archivos de prueba (espec)
    ]
  });
};
