Feature: Lista de Conversas Recentes
    As a usuário
    I want ver a lista de conversas recentes ordenada cronologicamente
    So that posso acompanhar as interações mais recentes

Scenario: Fixar uma Conversa no Topo
    Given o usuário está na página de "Conversas Recentes"
    And visualiza uma conversa
    When seleciona a opção para fixar essa conversa
    Then a conversa é movida para o topo da lista
    And é mantida lá independentemente da ordem cronológica
    And outras conversas são ajustadas de acordo
    And a conversa fixada é destacada como tal

Scenario: Excluir uma Conversa
    Given o usuário está na página de "Conversas Recentes"
    And visualiza uma conversa
    When seleciona a opção para excluir essa conversa
    And confirma a exclusão
    And visualiza uma conversa limitada
    When opta por excluí-la
    And o usuário confirma a exclusão
    Then a conversa selecionada é removida da lista
    And não aparece mais na tela de "Conversas Recentes"
    And outras conversas são ajustadas de acordo

Scenario: Selecionar e Abrir uma Conversa
    Given o usuário está na página de "Conversas Recentes"
    And visualiza uma conversa limitada
    When seleciona a conversa desejada
    Then é direcionado para a tela da conversa
    And pode visualizar o nome do contato, foto e histórico completo de mensagens
    And tem a capacidade de enviar novas mensagens na conversa em andamento

Scenario: Buscar uma Conversa
    Given o usuário está na página de "Conversas Recentes" com várias conversas listadas
    When utiliza a função de busca para encontrar uma conversa específica
    Then os resultados exibem a conversa relevante
    And filtram as outras conversas de acordo com a pesquisa realizada

Scenario: Desfixar uma Conversa do Topo
    Given o usuário está na página de "Conversas Recentes"
    And visualiza uma conversa fixada no topo da lista
    When seleciona a opção para desfixar essa conversa
    Then a conversa é movida para a posição em que segue a ordem cronológica
    And outras conversas são ajustadas de acordo
