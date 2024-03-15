Feature: Lista de Contatos
    As a usuário
    I want ver a lista de contatos ordenada alafabeticamente
    So that posso acompanhar os meus contatos

Scenario: remoção bem-sucedida de um contato
    Given o usuário está na página "contacts"
    When o usuário clica no botão "delete-contact-icon" na conversa com "Bob"
    And o usuário clica no botão "delete-contact-confirm"
    Then o usuário deve ver o contato com "Bob" removida