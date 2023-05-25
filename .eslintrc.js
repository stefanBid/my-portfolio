module.exports = {
    root: true,
    env: {
      node: true
    },
    extends:[
      "plugin:vue/vue3-recommended",
      "@vue/typescript/recommended",
      "eslint:recommended"
    ],
    parserOptions: {
      ecmaVersion: 2020
    },
    rules:{
      // !IMPORTANT: Every rule hav a warn level, because the errors are too much restrictive and prevents heart attacks

      // #Vue ESLINT rules

      // - Define tags order in vue files
      "vue/component-tags-order": ["warn", { "order": ["script:not[setup]" ,"script[setup]", "template", "style"] }],

      // - Define a block lang for script tag (in this case the project  have a typescript lang)
      "vue/block-lang": ["warn", { "script":{ "lang": "ts" }}],

      // - Define the valid indentation for space with HTML tags
      "vue/html-indent": ["warn", 4],

      // - Define the valid indentation of v-for directive exapmple (dont't missing the :key attribute)
      "vue/valid-v-for": "warn",

      // - Define the valid indntation for attribute number in a single and multiline
      "vue/max-attributes-per-line": ["warn", {
        "singleline": {
          "max": 6
        },      
        "multiline": {
          "max": 1
        }
      }],

      // - Define the valid indentation for tag attributes example (GOOD: is-keyword, BAD: isKeyword)
      "vue/attribute-hyphenation": ["warn", "always"],

      // -Define the valid indentation for elements in a single and multiline
      "vue/singleline-html-element-content-newline": ["warn", {
        "ignoreWhenNoAttributes": true,
        "ignoreWhenEmpty": true,
        "ignores":["h1", "h2", "h3", "h4", "h5", "h6", "p", "i", "slot"]
      }]


      // #Other ESLINT rules
      /*
        FIXME: This rule working correctly, search a solution for auto fix incorrect order
          "sort-imports":[
            "warn",
            {
              "ignoreCase": false,
              "ignoreDeclarationSort": false,
              "ignoreMemberSort": true,
              "memberSyntaxSortOrder": ["all", "multiple", "single", "none"]
            }
          ],
      */
    }
}