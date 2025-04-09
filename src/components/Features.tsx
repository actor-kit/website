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
      code: `// State machine visualization example
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
}`
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
          
          {activeTab === 4 ? (
            <div className="lg:w-2/3 rounded-xl bg-[#0D1117] overflow-hidden">
              <div className="p-6 h-full flex flex-col">
                <h3 className="text-gray-300 mb-4 font-mono">// State machine visualization example</h3>
                <div className="flex-grow">
                  {/* Replace the visualization with a Stately iframe */}
                  <iframe 
                    src="https://stately.ai/viz/embed/83bf2e88-4f2a-4dc4-9a72-d29679fd2019?machineId=83bf2e88-4f2a-4dc4-9a72-d29679fd2019&mode=viz"
                    className="w-full h-full min-h-[400px] border-0 rounded"
                    title="XState Machine Visualization"
                    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                  ></iframe>
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
    </section>
  );
};

export default Features;
