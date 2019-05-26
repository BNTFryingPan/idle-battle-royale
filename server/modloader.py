### Idle Battle Royale Modloader
import newserver
import library

# This module will be loaded by the server.
# Use this file to modify the behavour of the main server.

# NOTE: If you plan on creating a mod/modded server, is is recommended that you know basic python syntax.
# If you join the support discord showing no sign that you tried to look for an answer, you will not get
# any help. A good starting place for learning python is the python documentation.

# Mod API Documentation:

# NOTE: This Mod API is *currently* non-functional, however, it is a high priority
# NOTE: It is impossible to detect events not sent to the server by the client with a mod for the client.

# Events:
# Events are functions that are called when something happens. For example when a chat message is sent, or a player
# attacks another player.
# To modify the behavour of an event, you must define it as a function
# For example:

def event(): # This line defines the function
    pass     # 'pass' used when you are going to add something later, but need the code to be able to run

# List of events:

# eventChat(client, data)
# eventJoin(client)
# eventQuit(client)

# How to modify behavour:

# NOTE: 