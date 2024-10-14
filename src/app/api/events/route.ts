import { NextResponse } from 'next/server';

let events: string[] = []; // Array para armazenar eventos em memória (substitua por um banco de dados em produção)

export async function GET() {
  return NextResponse.json(events);
}

export async function POST(request: Request) {
  const { event } = await request.json();
  events.push(event); // Adiciona o novo evento
  return NextResponse.json({ success: true, event });
}

export async function PUT(request: Request) {
  const { index, event } = await request.json();
  if (index >= 0 && index < events.length) {
    events[index] = event; // Atualiza o evento existente
    return NextResponse.json({ success: true, event });
  }
  return NextResponse.json({ success: false, message: 'Index inválido' });
}

export async function DELETE(request: Request) {
  const { index } = await request.json();
  if (index >= 0 && index < events.length) {
    const deletedEvent = events.splice(index, 1); // Remove o evento
    return NextResponse.json({ success: true, deletedEvent });
  }
  return NextResponse.json({ success: false, message: 'Index inválido' });
}
