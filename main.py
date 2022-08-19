import random

def MontyHall(mode=0, iterations=100):
    wins = 0
    losses = 0
    if mode == 0: # Always Switch
            toSwitch = True
    elif mode == 1:
        toSwitch = False

    for i in range(iterations):
        # Randomise Correct Door
        correctDoor = random.randint(0,2)

        # Choose Door
        rChoose = random.randint(0,2)
        rChoose_def = rChoose

        # Coin Flip Decision to Switch (Mode 2)
        if mode == 2: 
            if random.randint(0,1) == 0:
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
            wins+=1
        else:
            losses+=1
        
    return {
        'wins':wins,
        'losses':losses,
        'winrate':100*wins/(wins+losses)
    }
        
res_switch = MontyHall(0,1000)
res_noSwitch = MontyHall(1,1000)
res_random = MontyHall(2,1000)

print('')
print('-Switch-')
print('Wins:',res_switch['wins'])
print('Losses:',res_switch['losses'])
print('Win Rate:',str(round(res_switch['winrate'],2))+'%')
print('')
print('-No Switch-')
print('Wins:',res_noSwitch['wins'])
print('Losses:',res_noSwitch['losses'])
print('Win Rate:',str(round(res_noSwitch['winrate'],2))+'%')
print('')
print('-Random-')
print('Wins:',res_random['wins'])
print('Losses:',res_random['losses'])
print('Win Rate:',str(round(res_random['winrate'],2))+'%')