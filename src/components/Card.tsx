import React from 'react'
import { iconify } from '../functions/iconify'
import { Card } from '../common/types'
import { createText } from '../functions/formatText'

interface Props {
  card: Card
}

export function BaseCard(props: Props) {
  const { card } = props
  const formattedText = createText(card.oracle_text)
  const manaCost = iconify(card.mana_cost)
  return (
    <>
      <div className="flex justify-between items-baseline">
        <h3 className="font-semibold text-xl">{card.name}</h3>
        <div className="flex ml-2">{manaCost}</div>
      </div>
      <p>{card.type_line}</p>
      {formattedText}
      {card.power && card.toughness && (
        <p className="flex justify-end items-center">
          {card.power}
          <i className="ms ms-power ml-tiny" /> / {card.toughness}
          <i className="ms ms-toughness ml-tiny" />
        </p>
      )}
    </>
  )
}

export function SplitCard(props: Props) {
  const { card }: any = props
  return (
    <>
      {card.card_faces.map((face: Card, index: number) => {
        const formattedText = createText(face.oracle_text)
        const margin = index != 0 ? ' mt-4' : ''
        const manaCost = iconify(face.mana_cost)
        return (
          <React.Fragment key={face.name}>
            <div className={`flex justify-between items-baseline ${margin}`}>
              <h3 className="font-semibold text-xl">{face.name}</h3>
              <div className="flex ml-2">{manaCost}</div>
            </div>
            <p>{face.type_line}</p>
            {formattedText}
            {face.power && face.toughness && (
              <p className="flex justify-end items-center">
                {face.power}
                <i className="ms ms-power ml-tiny" /> / {face.toughness}
                <i className="ms ms-toughness ml-tiny" />
              </p>
            )}
          </React.Fragment>
        )
      })}
    </>
  )
}
