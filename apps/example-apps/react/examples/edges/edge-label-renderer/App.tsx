import React, { useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  addEdge,
  useEdgesState,
  useNodesState,
  type EdgeTypes,
  type Edge,
  type OnConnect,
  type Node,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import CustomEdge from './CustomEdge';
import CustomEdgeStartEnd from './CustomEdgeStartEnd';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: '節點 1' },
    position: { x: 0, y: 0 },
  },
  { id: '2', data: { label: '節點 2' }, position: { x: 0, y: 300 } },
  { id: '3', data: { label: '節點 3' }, position: { x: 200, y: 0 } },
  { id: '4', data: { label: '節點 4' }, position: { x: 200, y: 300 } },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    data: {
      label: '邊線標籤',
    },
    type: 'custom',
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    data: {
      startLabel: '起點標籤',
      endLabel: '終點標籤',
    },
    type: 'start-end',
  },
];

const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
  'start-end': CustomEdgeStartEnd,
};

const EdgesFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      edgeTypes={edgeTypes}
      fitView
    >
      <Controls />
      <Background />
    </ReactFlow>
  );
};

export default EdgesFlow;
