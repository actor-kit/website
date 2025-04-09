import { useState, useEffect } from "react";
import { Server, Globe, Code, Lock, Cpu, Workflow } from "lucide-react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-javascript";

const Features = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  // Initialize Prism.js after component mount and whenever the tab changes
  useEffect(() => {
    Prism.highlightAll();
  }, [activeTab]);
  
  const features = [
    {
      icon: <Server className="h-5 w-5" />,
      title: "Server-Side Rendering",
      description: "Fetch initial state server-side for optimal performance and SEO. Works seamlessly with Next.js, Remix, and other modern frameworks.",
      code: `// src/app/lists/[id]/page.tsx
import { createAccessToken, createActorFetch } from "actor-kit/server";
import { TodoActorKitProvider } from "./todo.context";

const fetchTodoActor = createActorFetch<TodoMachine>({
  actorType: "todo",
  host: process.env.ACTOR_KIT_HOST!,
});

export default async function TodoPage({ params }) {
  const listId = params.id;
  const userId = await getUserId();

  const accessToken = await createAccessToken({
    signingKey: process.env.ACTOR_KIT_SECRET!,
    actorId: listId,
    actorType: "todo",
    callerId: userId,
    callerType: "client",
  });

  const payload = await fetchTodoActor({
    actorId: listId,
    accessToken,
  });

  return (
    <TodoActorKitProvider
      host={host}
      actorId={listId}
      accessToken={accessToken}
      checksum={payload.checksum}
      initialSnapshot={payload.snapshot}
    >
      <TodoList />
    </TodoActorKitProvider>
  );
}`
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Real-time Updates",
      description: "Changes are immediately reflected across all connected clients, ensuring a responsive user experience. WebSockets handled for you.",
      code: `// src/app/lists/[id]/components.tsx
"use client";

import React, { useState } from "react";
import { TodoActorKitContext } from "./todo.context";

export function TodoList() {
  const todos = TodoActorKitContext.useSelector(
    (state) => state.public.todos
  );
  const send = TodoActorKitContext.useSend();
  const [newTodoText, setNewTodoText] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      send({ type: "ADD_TODO", text: newTodoText.trim() });
      setNewTodoText("");
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => send({ 
              type: "TOGGLE_TODO", 
              id: todo.id 
            })}>
              {todo.completed ? "Undo" : "Complete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}`
    },
    {
      icon: <Code className="h-5 w-5" />,
      title: "Type Safety",
      description: "Leverage TypeScript and Zod for robust type checking and runtime validation, preventing runtime errors and improving developer experience.",
      code: `// src/todo.schemas.ts
import { z } from "zod";

export const TodoClientEventSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("ADD_TODO"),
    text: z.string(),
  }),
  z.object({
    type: z.literal("TOGGLE_TODO"),
    id: z.string(),
  }),
  z.object({
    type: z.literal("DELETE_TODO"),
    id: z.string(),
  }),
]);

export const TodoServiceEventSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("SYNC_TODOS"),
    todos: z.array(
      z.object({ 
        id: z.string(), 
        text: z.string(), 
        completed: z.boolean() 
      })
    ),
  }),
]);

// src/todo.server.ts
import { createMachineServer } from "actor-kit/worker";

export const Todo = createMachineServer({
  machine: todoMachine,
  schemas: {
    clientEvent: TodoClientEventSchema,
    serviceEvent: TodoServiceEventSchema,
    inputProps: TodoInputPropsSchema,
  },
  options: {
    persisted: true,
  },
});`
    },
    {
      icon: <Workflow className="h-5 w-5" />,
      title: "Event-Driven Architecture",
      description: "All state changes are driven by events, providing a clear and predictable data flow with full audit trail capabilities.",
      code: `// src/todo.machine.ts
import { ActorKitStateMachine } from "actor-kit";
import { assign, setup } from "xstate";

export const todoMachine = setup({
  types: {
    context: {} as TodoServerContext,
    events: {} as TodoEvent,
    input: {} as TodoInput,
  },
  actions: {
    addTodo: assign({
      public: ({ context, event }) => {
        if (event.type !== "ADD_TODO") return context.public;
        return {
          ...context.public,
          todos: [
            ...context.public.todos,
            { 
              id: crypto.randomUUID(), 
              text: event.text, 
              completed: false 
            },
          ],
          lastSync: Date.now(),
        };
      },
    }),
    // other actions...
  },
}).createMachine({
  id: "todoList",
  initial: "idle",
  context: {
    public: {
      ownerId: caller.id,
      todos: [],
      lastSync: null,
    },
    private: {},
  },
  states: {
    idle: {
      on: {
        ADD_TODO: {
          actions: "addTodo",
        },
        TOGGLE_TODO: {
          actions: "toggleTodo",
        },
        DELETE_TODO: {
          actions: "deleteTodo",
        },
      },
    },
    // other states...
  },
});`
    },
    {
      icon: <Cpu className="h-5 w-5" />,
      title: "State Machine Logic",
      description: "Powered by XState, making complex state management more manageable and visualizable, with tools for debugging and state inspection.",
      code: `// app/game.machine.ts
import { ActorKitStateMachine } from "actor-kit";
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
        
        const existingPlayerIndex = context.public.players.findIndex(
          (p) => p.id === event.caller.id
        );
        
        if (existingPlayerIndex >= 0) {
          const updatedPlayers = [...context.public.players];
          updatedPlayers[existingPlayerIndex] = {
            ...updatedPlayers[existingPlayerIndex],
            name: event.playerName,
            score: 0,
          };
          
          return {
            ...context.public,
            players: updatedPlayers,
          };
        }
        
        const newPlayer: Player = {
          id: event.caller.id,
          name: event.playerName,
          score: 0,
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
        currentQuestion: {
          questionId: Object.keys(context.public.questions)[0],
          startTime: Date.now(),
          answers: [],
        },
        questionNumber: 1,
      }),
    }),
  },
  guards: {
    isHost: ({ context, event }) => {
      return context.public.hostId === event.caller.id;
    },
    hasEnoughPlayers: ({ context }) => {
      return context.public.players.length >= 2;
    },
    hasQuestions: ({ context }) => {
      return Object.keys(context.public.questions).length > 0;
    },
  },
}).createMachine({
  id: "game",
  initial: "lobby",
  context: ({ input }: { input: GameInput }) => ({
    public: {
      id: crypto.randomUUID(),
      hostId: input.caller.id,
      hostName: input.hostName,
      players: [],
      currentQuestion: null,
      winner: null,
      settings: {
        maxPlayers: 100,
        answerTimeWindow: 30,
      },
      questions: {},
      questionResults: [],
      questionNumber: 0,
    },
    private: {},
  }),
  states: {
    lobby: {
      on: {
        JOIN_GAME: {
          actions: "addPlayer",
        },
        START_GAME: [
          {
            guard: "isHost",
            target: "playing",
            actions: "startGame",
          },
        ],
        PARSE_QUESTIONS: {
          guard: "isHost",
          actions: "parseQuestions",
        },
        QUESTIONS_PARSED: {
          guard: "isHost",
          actions: "setQuestions",
        },
        UPDATE_SETTINGS: {
          guard: "isHost",
          actions: "updateSettings",
        },
      },
    },
    playing: {
      on: {
        SUBMIT_ANSWER: {
          actions: "recordAnswer",
        },
        NEXT_QUESTION: [
          {
            guard: "isHost",
            actions: "startNextQuestion",
          },
        ],
        SKIP_QUESTION: {
          guard: "isHost",
          actions: "skipQuestion",
        },
      },
    },
  },
}) satisfies ActorKitStateMachine<
  GameEvent,
  GameInput,
  GamePrivateContext,
  GamePublicContext
>;`
    },
    {
      icon: <Lock className="h-5 w-5" />,
      title: "Access Control",
      description: "Powerful built-in access control with public and private data. Control what data is shared across clients and what stays private.",
      code: `// Access control with caller-specific private data
export type TodoPublicContext = {
  ownerId: string;
  todos: Array<{ 
    id: string; 
    text: string; 
    completed: boolean 
  }>;
  lastSync: number | null;
};

export type TodoPrivateContext = {
  accessCount: number;
  settings: {
    sortOrder: "asc" | "desc";
    showCompleted: boolean;
  }
};

export type TodoServerContext = {
  public: TodoPublicContext;
  private: Record<string, TodoPrivateContext>;
};

// Update private data in an action
const incrementAccessCount = assign({
  private: ({ context, caller }) => {
    const currentCallerPrivate = context.private[caller.id] || { 
      accessCount: 0,
      settings: {
        sortOrder: "asc",
        showCompleted: true
      }
    };
    
    return {
      ...context.private,
      [caller.id]: {
        ...currentCallerPrivate,
        accessCount: currentCallerPrivate.accessCount + 1
      }
    };
  }
});`
    }
  ];

  return (
    <section className="py-20 bg-secondary/50" id="features">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built for <span className="text-cf-blue">Cloudflare Workers</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Actor Kit combines XState with Durable Objects to create a powerful framework for building distributed applications.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
            <div className="flex flex-col space-y-1">
              {features.map((feature, index) => (
                <button
                  key={index}
                  className={`flex items-center space-x-3 p-4 rounded-lg text-left transition-colors ${
                    activeTab === index 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-primary/10"
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  <div className={activeTab === index ? "text-primary-foreground" : "text-primary"}>
                    {feature.icon}
                  </div>
                  <div>
                    <div className="font-medium">{feature.title}</div>
                    <div className={`text-sm ${
                      activeTab === index ? "text-primary-foreground/80" : "text-muted-foreground"
                    }`}>
                      {feature.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="lg:w-2/3 rounded-xl bg-[#0D1117] overflow-hidden">
            <pre className="h-full overflow-auto p-6 text-sm">
              <code className="language-typescript">
                {features[activeTab].code}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
