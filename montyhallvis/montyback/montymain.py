import random
from time import sleep
import requests


def MontyHall(mode=0, iterations=100):
    wins = 0
    losses = 0
    if mode == 0:  # Always Switch
        toSwitch = True
    elif mode == 1:
        toSwitch = False

    for i in range(iterations):
        # Randomise Correct Door
        correctDoor = random.randint(0, 2)

        # Choose Door
        rChoose = random.randint(0, 2)
        rChoose_def = rChoose

        # Coin Flip Decision to Switch (Mode 2)
        if mode == 2:
            if random.randint(0, 1) == 0:
                toSwitch = False
            else:
                toSwitch = True

        # Switch Door
        if (toSwitch):
            if rChoose == 0:
                if correctDoor == 0 or correctDoor == 2:
                    # Door 1 becomes unselectable; revealed
                    rChoose = 2
                elif correctDoor == 1:
                    # Door 2 becomes unselectable; revealed
                    rChoose = 1

            elif rChoose == 1:
                if correctDoor == 1 or correctDoor == 2:
                    # Door 0 becomes unselectable; revealed
                    rChoose = 2
                elif correctDoor == 0:
                    # Door 2 becomes unselectable; revealed
                    rChoose = 0

            elif rChoose == 2:
                if correctDoor == 1 or correctDoor == 2:
                    # Door 0 becomes unselectable; revealed
                    rChoose = 1
                elif correctDoor == 0:
                    # Door 1 becomes unselectable; revealed
                    rChoose = 0

        # print('Correct:', correctDoor,'; Picked:', rChoose_def, '; Switched to:', rChoose)

        if correctDoor == rChoose:
            wins += 1
        else:
            losses += 1

    return {
        'wins': wins,
        'losses': losses,
        'winrate': 100*wins/(wins+losses)
    }


def MontyHall_single(mode=0):

    # Randomise Correct Door
    correctDoor = random.randint(0, 2)
    # Choose Door
    rChoose = random.randint(0, 2)

    if mode == 0:  # Always Switch
        toSwitch = True
    elif mode == 1:
        toSwitch = False
    # Coin Flip Decision to Switch (Mode 2)
    elif mode == 2:
        if random.randint(0, 1) == 0:
            toSwitch = False
        else:
            toSwitch = True

    # Switch Door
    if (toSwitch):
        if rChoose == 0:
            if correctDoor == 0 or correctDoor == 2:
                # Door 1 becomes unselectable; revealed
                rChoose = 2
            elif correctDoor == 1:
                # Door 2 becomes unselectable; revealed
                rChoose = 1

        elif rChoose == 1:
            if correctDoor == 1 or correctDoor == 2:
                # Door 0 becomes unselectable; revealed
                rChoose = 2
            elif correctDoor == 0:
                # Door 2 becomes unselectable; revealed
                rChoose = 0

        elif rChoose == 2:
            if correctDoor == 1 or correctDoor == 2:
                # Door 0 becomes unselectable; revealed
                rChoose = 1
            elif correctDoor == 0:
                # Door 1 becomes unselectable; revealed
                rChoose = 0

    # print('Correct:', correctDoor,'; Picked:', rChoose_def, '; Switched to:', rChoose)

    if correctDoor == rChoose:
        isWin = True
    else:
        isWin = False

    return {
        'isWin': isWin,
    }


if (__name__ == "__main__"):
    mode = 0
    endp = f'http://127.0.0.1:8000/API/score/{mode}'
    while True:
        getData = requests.get(endp).json()
        if MontyHall_single(mode=mode)['isWin']:
            cc = getData['correctCount']
            print('CORRECT', requests.put(
                endp, data={'correctCount': int(cc)+1}).text)
        else:
            wc = getData['wrongCount']
            print('WRONG:', requests.put(
                endp, data={'wrongCount': int(wc)+1}).text)
        sleep(2)
