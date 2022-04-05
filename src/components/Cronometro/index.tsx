import Botao from "../Botao";
import Relogio from "./Relogio";
import style from "./Cronometro.module.scss";
import { ITarefa } from "../../types/tarefa";
import { useEffect, useState } from "react";
import { tempoParaSegundos } from "../../common/utils/time";

interface IProps {
  selecionado: ITarefa | undefined,
  finalizarTarefa: () => void,
}

export default function Cronometro({ selecionado, finalizarTarefa }: IProps) {
  const [tempo, setTempo] = useState<number>();

  useEffect(() => {
    if (selecionado?.tempo) {
      setTempo(tempoParaSegundos(selecionado.tempo));
    }
  }, [selecionado]);

  function contagemRegressiva(contador: number = 0) {
    setTimeout(() => {
      if (contador > 0) {
        setTempo(contador - 1)
        return contagemRegressiva(contador - 1);
      }
      finalizarTarefa()
    }, 1000);
  }

  return (
    <div className={style.cronometro}>
      <p className={style.titulo}>Escolha um card e inicie o Cronômetro</p>
      <div className={style.relogioWrapper}>
        <Relogio tempo={tempo} />
      </div>
      <Botao onClick={() => contagemRegressiva(tempo)}>Começar!</Botao>
    </div>
  );
}
