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
  const [animateStates, setAnimateStates] = useState(false);
  
  // Initialize animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateStates(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
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
      code: `// State machine visualization example
/*
┌─────────────────────────┐
│          idle           │◀─────────┐
└─────────────────────────┘          │
           │  │                      │
           │  │                      │
           │  │                      │
           │  ▼                      │
┌─────────────────────────┐          │
│         loading         │          │
└─────────────────────────┘          │
           │                         │
           │                         │
           ▼                         │
┌─────────────────────────┐          │
│          ready          │────────────┐
└─────────────────────────┘          │ │
           │                         │ │
           │                         ��� │
           ▼                         │ │
┌─────────────────────────┐          │ │
│      synchronizing      │          │ │
└─────────────────────────┘          │ │
           │                         │ │
           │                         │ │
           ▼                         │ │
┌─────────────────────────┐          │ │
│       synchronized      │─────────┘ │
└─────────────────────────┘            │
                                       │
┌─────────────────────────┐            │
│          error          │◀───────────┘
└─────────────────────────┘
*/`
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

  // Only update the visualization for the State Machine Logic tab
  if (features[4] && features[4].icon) {
    features[4].code = `// State machine visualization example
/*
      +------------------------+
      |         idle          |<---------+
      +------------------------+         |
               |  |                      |
               |  |                      |
               |  v                      |
      +------------------------+         |
      |        loading        |         |
      +------------------------+         |
               |                         |
               |                         |
               v                         |
      +------------------------+         |
      |         ready         |-----------+
      +------------------------+         | |
               |                         | |
               |                         | |
               v                         | |
      +------------------------+         | |
      |     synchronizing     |         | |
      +------------------------+         | |
               |                         | |
               |                         | |
               v                         | |
      +------------------------+         | |
      |     synchronized      |---------+ |
      +------------------------+           |
                                          |
      +------------------------+           |
      |         error          |<-----------+
      +------------------------+
*/

// Visualization with interactive state inspection
import { useMachine } from '@xstate/react';
import { inspect } from '@xstate/inspect';

// Enable visual debugger in development
if (process.env.NODE_ENV === 'development') {
  inspect({
    url: 'https://stately.ai/viz?inspect',
    iframe: () => document.querySelector('#xstate-inspector')
  });
}

function TodoApp() {
  const [state, send] = useMachine(todoMachine, { 
    devTools: true 
  });
  
  return (
    <div>
      <div className="state-indicator">
        Current state: {state.value}
      </div>
      {/* Rest of your component */}
      
      {/* Add this at the bottom of your app */}
      <iframe id="xstate-inspector" />
    </div>
  );
}`;
  }

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
          
          {activeTab === 4 ? (
            <div className="lg:w-2/3 rounded-xl bg-[#0D1117] overflow-hidden">
              <div className="p-6 h-full flex flex-col">
                <h3 className="text-gray-300 mb-4 font-mono">// State machine visualization example</h3>
                <div className="flex-grow relative">
                  {/* Interactive state machine visualization */}
                  <div className="state-machine-diagram">
                    {/* States with fancy styling */}
                    <div className={`state-node state-idle ${animateStates ? "animate-in" : ""}`}>
                      <div className="state-content">idle</div>
                    </div>
                    
                    <div className={`state-node state-loading ${animateStates ? "animate-in" : ""} delay-100`}>
                      <div className="state-content">loading</div>
                    </div>
                    
                    <div className={`state-node state-ready ${animateStates ? "animate-in" : ""} delay-200`}>
                      <div className="state-content">ready</div>
                    </div>
                    
                    <div className={`state-node state-synchronizing ${animateStates ? "animate-in" : ""} delay-300`}>
                      <div className="state-content">synchronizing</div>
                    </div>
                    
                    <div className={`state-node state-synchronized ${animateStates ? "animate-in" : ""} delay-400`}>
                      <div className="state-content">synchronized</div>
                    </div>
                    
                    <div className={`state-node state-error ${animateStates ? "animate-in" : ""} delay-500`}>
                      <div className="state-content">error</div>
                    </div>
                    
                    {/* Transition lines */}
                    <div className={`transition-line line-idle-loading ${animateStates ? "animate-in" : ""}`}></div>
                    <div className={`transition-line line-loading-ready ${animateStates ? "animate-in" : ""} delay-100`}></div>
                    <div className={`transition-line line-ready-sync ${animateStates ? "animate-in" : ""} delay-200`}></div>
                    <div className={`transition-line line-sync-synced ${animateStates ? "animate-in" : ""} delay-300`}></div>
                    <div className={`transition-line line-synced-error ${animateStates ? "animate-in" : ""} delay-400`}></div>
                    <div className={`transition-line line-error-idle ${animateStates ? "animate-in" : ""} delay-500`}></div>
                    <div className={`transition-line line-ready-idle ${animateStates ? "animate-in" : ""} delay-200`}></div>
                  </div>
                  
                  {/* Legend */}
                  <div className="absolute bottom-2 right-2 bg-gray-900/60 backdrop-blur-sm rounded p-2 text-xs text-gray-400">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded bg-blue-500"></div>
                      <span>Active State</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-0.5 bg-gray-500"></div>
                      <span>Transition</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="lg:w-2/3 rounded-xl bg-[#0D1117] overflow-hidden">
              <pre className="h-full overflow-auto p-6 text-sm">
                <code className="language-typescript">
                  {features[activeTab].code}
                </code>
              </pre>
            </div>
          )}
        </div>
      </div>
      
      {/* Add styles for the state machine visualization */}
      <style>
        {`
        .state-machine-diagram {
          position: relative;
          width: 100%;
          height: 400px;
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: repeat(6, 1fr);
          overflow: hidden;
        }
        
        .state-node {
          position: relative;
          width: 220px;
          height: 50px;
          border: 1px solid rgba(121, 142, 170, 0.5);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(30, 41, 59, 0.7);
          margin: 0 auto;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease;
          box-shadow: 0 0 0 rgba(59, 130, 246, 0);
        }
        
        .state-node.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .state-content {
          font-family: monospace;
          color: #e2e8f0;
          font-size: 14px;
        }
        
        .state-idle {
          grid-row: 1;
        }
        
        .state-loading {
          grid-row: 2;
        }
        
        .state-ready {
          grid-row: 3;
        }
        
        .state-synchronizing {
          grid-row: 4;
        }
        
        .state-synchronized {
          grid-row: 5;
        }
        
        .state-error {
          grid-row: 6;
          border-color: rgba(220, 38, 38, 0.5);
        }
        
        .transition-line {
          position: absolute;
          background-color: rgba(148, 163, 184, 0.3);
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        
        .transition-line.animate-in {
          opacity: 1;
        }
        
        .line-idle-loading {
          width: 2px;
          height: 60px;
          left: 50%;
          top: 50px;
        }
        
        .line-loading-ready {
          width: 2px;
          height: 60px;
          left: 50%;
          top: 100px;
        }
        
        .line-ready-sync {
          width: 2px;
          height: 60px;
          left: 50%;
          top: 150px;
        }
        
        .line-sync-synced {
          width: 2px;
          height: 60px;
          left: 50%;
          top: 200px;
        }
        
        .line-synced-error {
          width: 2px;
          height: 60px;
          transform: rotate(45deg);
          left: 40%;
          top: 250px;
        }
        
        .line-error-idle {
          width: 2px;
          height: 200px;
          transform: rotate(-45deg);
          right: 30%;
          top: 100px;
        }
        
        .line-ready-idle {
          width: 2px;
          height: 120px;
          transform: rotate(-45deg);
          right: 35%;
          top: 70px;
        }
        
        .delay-100 {
          transition-delay: 0.1s;
        }
        
        .delay-200 {
          transition-delay: 0.2s;
        }
        
        .delay-300 {
          transition-delay: 0.3s;
        }
        
        .delay-400 {
          transition-delay: 0.4s;
        }
        
        .delay-500 {
          transition-delay: 0.5s;
        }
        
        /* Add hover effects */
        .state-node:hover {
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
          border-color: rgba(59, 130, 246, 0.8);
          z-index: 10;
        }
        
        .state-error:hover {
          box-shadow: 0 0 15px rgba(220, 38, 38, 0.5);
          border-color: rgba(220, 38, 38, 0.8);
        }
        `}
      </style>
    </section>
  );
};

export default Features;
