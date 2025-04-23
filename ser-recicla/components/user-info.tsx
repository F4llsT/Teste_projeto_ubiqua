type UserInfoProps = {
  user: {
    name: string
    email: string
    turma: string
    curso: string
    semestre: string
    turno: string
    unidade: string
  }
}

export function UserInfo({ user }: UserInfoProps) {
  return (
    <div className="mb-6 p-4 bg-green-50 rounded-lg">
      <h3 className="font-medium mb-2">Informações do Usuário</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-semibold">Nome:</span> {user.name}
        </div>
        <div>
          <span className="font-semibold">Turma:</span> {user.turma}
        </div>
        <div>
          <span className="font-semibold">Curso:</span> {user.curso}
        </div>
        <div>
          <span className="font-semibold">Semestre:</span> {user.semestre}
        </div>
        <div>
          <span className="font-semibold">Turno:</span> {user.turno}
        </div>
        <div>
          <span className="font-semibold">Unidade:</span> {user.unidade}
        </div>
      </div>
    </div>
  )
}
