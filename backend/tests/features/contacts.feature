Feature: Contact List 

Scenario: Obter a lista de contatos
    Given o método getAllContacts retorna todos os contatos ordenados por ordem alfabética 
    And o contato com id "1", nome "João Pedro", número "00000000" e mais "Apelido JP" pertence à lista
    And o contato com id "4", nome "Alice", número "00000004" e mais "É chorona" pertence à lista
    And o contato com id "3", nome "Charlie", número "00000003" e mais "Chamar de Brown" pertence à lista
    When uma requisição GET for enviada para "/api/contacts"
    Then o status da resposta deve ser "200"
    And o JSON da resposta deve conter uma lista com os contatos existentes exibidos em ordem alfabética