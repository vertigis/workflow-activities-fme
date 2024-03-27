module.exports = {
    extends: [require.resolve("@vertigis/workflow-sdk/config/.eslintrc")],
    ignorePatterns: ["src/FMEServer.js"],
    rules: {
        "no-restricted-imports": "off",
        "@typescript-eslint/no-restricted-imports": [
            "error",
            {
                paths: [
                    {
                        name: "@vertigis/workflow",
                        message:
                            "This project should only reference types from @vertigis/workflow.",
                        allowTypeImports: true,
                    },
                ],
            },
        ],
    },
};
