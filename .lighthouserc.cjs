const isExternalTarget = Boolean(process.env.LHCI_URL);

module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      url: [process.env.LHCI_URL || 'http://localhost:4173/'],
      ...(isExternalTarget
        ? {}
        : {
            startServerCommand: 'npm run build && npx vite preview --port 4173 --strictPort',
            startServerReadyPattern: 'localhost|Local',
            startServerReadyTimeout: 120000,
          }),
      settings: {
        emulatedFormFactor: 'mobile',
        throttlingMethod: 'simulate',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.85 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-byte-weight': ['warn', { maxNumericValue: 700000 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
