import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, CheckCheck } from "lucide-react";

const CodeExample = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const machineCode = `import { ActorKitStateMachine } from "actor-kit";
import { assign, setup } from "xstate";
import type {
  GameEvent,
  GameInput,
  GamePrivateContext,
  GamePublicContext,
  GameServerContext,
  Player,
} from "./game.types";

export const gameMachine = setup({
  types: {
    context: {} as GameServerContext,
    events: {} as GameEvent,
    input: {} as GameInput,
  },
  actions: {
    addPlayer: assign({
      public: ({ context, event }) => {
        if (event.type !== "JOIN_GAME") return context.public;
        
        // Check if player already exists
        const existingPlayerIndex = context.public.players.findIndex(
          (p) => p.id === event.caller.id
        );
        
        // If player exists, update their name
        if (existingPlayerIndex >= 0) {
          const updatedPlayers = [...context.public.players];
          updatedPlayers[existingPlayerIndex] = {
            ...updatedPlayers[existingPlayerIndex],
            name: event.name,
            status: "ready",
          };
          
          return {
            ...context.public,
            players: updatedPlayers,
          };
        }
        
        // Otherwise add new player
        const newPlayer: Player = {
          id: event.caller.id,
          name: event.name,
          score: 0,
          status: "ready",
        };
        
        return {
          ...context.public,
          players: [...context.public.players, newPlayer],
        };
      },
    }),
    
    startGame: assign({
      public: ({ context }) => ({
        ...context.public,
        gameStatus: "active",
        currentRound: 1,
        startTime: Date.now(),
      }),
    }),
    
    // More actions...
  },
  guards: {
    isGameOwner: ({ context, event }) => {
      return context.public.ownerId === event.caller.id;
    },
    hasEnoughPlayers: ({ context }) => {
      return context.public.players.length >= 2;
    },
  },
}).createMachine({
  id: "game",
  initial: "lobby",
  context: {
    public: {
      ownerId: caller.id,
      players: [],
      gameStatus: "waiting",
      currentRound: 0,
      rounds: 3,
      startTime: null,
    },
    private: {},
  },
  states: {
    lobby: {
      on: {
        JOIN_GAME: {
          actions: "addPlayer",
        },
        LEAVE_GAME: {
          actions: "removePlayer",
        },
        START_GAME: {
          guard: "isGameOwner",
          actions: "startGame",
          target: "playing",
        },
      },
    },
    playing: {
      on: {
        SUBMIT_ANSWER: {
          actions: "recordAnswer",
        },
        END_ROUND: {
          guard: "isGameOwner",
          actions: "endRound",
          target: "roundEnded",
        },
      },
    },
    roundEnded: {
      on: {
        START_NEXT_ROUND: {
          guard: "isGameOwner",
          actions: "startNextRound",
          target: "playing",
        },
        END_GAME: {
          guard: "isGameOwner",
          actions: "endGame",
          target: "gameOver",
        },
      },
    },
    gameOver: {
      on: {
        RESTART_GAME: {
          guard: "isGameOwner",
          actions: "resetGame",
          target: "lobby",
        },
      },
    },
  },
}) satisfies ActorKitStateMachine<
  GameEvent,
  GameInput,
  GamePrivateContext,
  GamePublicContext
>;`;

  const serverCode = `import { createMachineServer } from "actor-kit/worker";
import { gameMachine } from "./game.machine";
import {
  GameClientEventSchema,
  GameServiceEventSchema,
  GameInputPropsSchema,
} from "./game.schemas";

export const Game = createMachineServer({
  machine: gameMachine,
  schemas: {
    clientEvent: GameClientEventSchema,
    serviceEvent: GameServiceEventSchema,
    inputProps: GameInputPropsSchema,
  },
  options: {
    persisted: true,
  },
});

export type GameServer = InstanceType<typeof Game>;
export default Game;`;

  const workerCode = `import { DurableObjectNamespace } from "@cloudflare/workers-types";
import { AnyActorServer } from "actor-kit";
import { createActorKitRouter } from "actor-kit/worker";
import { WorkerEntrypoint } from "cloudflare:workers";
import { Game, GameServer } from "./game.server";

interface Env {
  GAME: DurableObjectNamespace<GameServer>;
  ACTOR_KIT_SECRET: string;
  [key: string]: DurableObjectNamespace<AnyActorServer> | unknown;
}

const router = createActorKitRouter<Env>(["game"]);

export { Game };

export default class Worker extends WorkerEntrypoint<Env> {
  fetch(request: Request): Promise<Response> | Response {
    if (request.url.includes("/api/")) {
      return router(request, this.env, this.ctx);
    }

    return new Response("Game API powered by ActorKit");
  }
}`;

  const clientCode = `"use client";

import React, { useState } from "react";
import { GameActorKitContext } from "./game.context";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function GameLobby() {
  const gameStatus = GameActorKitContext.useSelector(
    (state) => state.public.gameStatus
  );
  const players = GameActorKitContext.useSelector(
    (state) => state.public.players
  );
  const ownerId = GameActorKitContext.useSelector(
    (state) => state.public.ownerId
  );
  const send = GameActorKitContext.useSend();
  const [playerName, setPlayerName] = useState("");
  
  const isOwner = GameActorKitContext.useClient().callerId === ownerId;
  
  const handleJoinGame = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      send({ type: "JOIN_GAME", name: playerName.trim() });
    }
  };
  
  const handleStartGame = () => {
    send({ type: "START_GAME" });
  };
  
  return (
    <div>
      <h1>Game Lobby</h1>
      
      {players.length > 0 ? (
        <div>
          <h2>Players:</h2>
          <ul>
            {players.map((player) => (
              <li key={player.id}>
                {player.name} {player.id === ownerId && "(Host)"}
              </li>
            ))}
          </ul>
          
          {isOwner && players.length >= 2 && (
            <Button onClick={handleStartGame}>
              Start Game
            </Button>
          )}
        </div>
      ) : (
        <form onSubmit={handleJoinGame}>
          <Input
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
          />
          <Button type="submit">
            Join Game
          </Button>
        </form>
      )}
    </div>
  );
}`;

  return (
    <section className="py-20 container" id="code-example">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Build Complex, Interactive Applications with Ease
        </h2>
        <p className="text-lg text-muted-foreground">
          Actor Kit provides a seamless way to build stateful applications on Cloudflare Workers
        </p>
      </div>
      
      <div className="rounded-xl border overflow-hidden shadow-lg">
        <Tabs defaultValue="machine">
          <div className="bg-card/80 border-b p-2">
            <div className="flex items-center justify-between">
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="machine">Machine</TabsTrigger>
                <TabsTrigger value="server">Server</TabsTrigger>
                <TabsTrigger value="worker">Worker</TabsTrigger>
                <TabsTrigger value="client">Client</TabsTrigger>
              </TabsList>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => copyToClipboard(machineCode)}
                className="h-8 px-2"
              >
                {copied ? (
                  <CheckCheck className="h-4 w-4 mr-1" />
                ) : (
                  <Copy className="h-4 w-4 mr-1" />
                )}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>
          
          <TabsContent value="machine" className="p-0 m-0">
            <pre className="code-block h-[500px] overflow-auto p-6">
              <code className="language-typescript">
                {machineCode}
              </code>
            </pre>
          </TabsContent>
          
          <TabsContent value="server" className="p-0 m-0">
            <pre className="code-block h-[500px] overflow-auto p-6">
              <code className="language-typescript">
                {serverCode}
              </code>
            </pre>
          </TabsContent>
          
          <TabsContent value="worker" className="p-0 m-0">
            <pre className="code-block h-[500px] overflow-auto p-6">
              <code className="language-typescript">
                {workerCode}
              </code>
            </pre>
          </TabsContent>
          
          <TabsContent value="client" className="p-0 m-0">
            <pre className="code-block h-[500px] overflow-auto p-6">
              <code className="language-typescript">
                {clientCode}
              </code>
            </pre>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default CodeExample;
