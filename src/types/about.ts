export type About = {
    _id?: string
    quienesSomos: string
    mision: string
    vision: string
    antecedentes: string
}

export type AboutForm = Pick<About, 'quienesSomos' | 'mision' | 'vision' | 'antecedentes'>