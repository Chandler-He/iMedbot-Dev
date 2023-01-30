import requests
class trello_wrapper:
    def __init__(self, key, token):
        self.query = {
            "key": key,
            "token": token
        }

        self.headers = {
            "Accept": "application/json"
        }

        self.boards_list_url = "https://api.trello.com/1/boards/{}/lists"
        self.board_labels = "https://api.trello.com/1/boards/{}/labels"
        self.cards_url = "https://api.trello.com/1/cards"
    def get_board(self, board):
        board = requests.get(
            f"{board}.json",
            headers=self.headers,
            params=self.query
        )

        return board.json()

    def get_single_list(self, board, name):
        board_lists = requests.get(
            self.boards_list_url.format(board["id"]),
            headers=self.headers,
            params=self.query
        )

        board = [board_list for board_list in board_lists.json() if board_list["name"] == name]

        return board[0]

    def get_single_board_labels(self, board, label_name):
        labels = requests.get(
            self.board_labels.format(board["id"]),
            headers=self.headers,
            params=self.query
        )
        print(labels.json())
        label = [board_label for board_label in labels.json() if board_label["name"] == label_name]

        return label[0]

    def create_card(self, board_list, labels, card_name, description):
        additional_params = {
            "idList": board_list["id"],
            "name": card_name,
            "idLabels": labels,
            "desc": description
        }

        new_card = requests.post(
            self.cards_url,
            headers=self.headers,
            params={**self.query, **additional_params}
        )

    def move_card(self, card, new_board):
        additional_params = {
            "idBoard": new_board["id"]
        }

        updated_card = requests.put(
            f"{self.cards_url}/{card['id']}",
            headers=self.headers,
            params={**self.query, **additional_params}
        )

        return updated_card.json()