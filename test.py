from trello_wrapper import *

trello_api_key="fa4a23cc48f9f53430e93a41ef6f7e66"
trello_token="ATTA9028986991f0dfe8bd48f894b702792fe3bf71f3af2eb0207f5685adfc88a0c1EC07FFAF"

trello_board_url="https://trello.com/b/IbXFiNmr"
trello = trello_wrapper(trello_api_key, trello_token)
board = trello.get_board(trello_board_url)
board_list =trello.get_single_list(board, "Reported")

board_label = trello.get_single_board_labels(board, "")
label_list = []
label_list.append(board_label["id"])

new_card = trello.create_card(board_list, label_list, "","test for api")

