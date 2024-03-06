import React, { useState, useEffect } from 'react'
import '../Card.css'

function Card({ game }) {
    let [fullDate, setFullDate] = useState('')

    useEffect(() => {
        let monthDate = new Date(game.release_date).toString().split(' ').slice(1, 3).join(' ')
        let year = new Date(game.release_date).toString().split(' ').slice(3, 4).join(' ')
        setFullDate(monthDate + ', ' + year)
    }, [])


    return (
        <div className='card'>
            <div>
                <h3>{game.title}</h3>
                <img src={game.thumbnail} alt="Game cover" />
                <div className='subheading'>
                    <div>{game.genre}</div>
                    <div>{game.platform}</div>
                </div>
                <p>{game.short_description}</p>
            </div>
            
            <div>
                <div className="published">
                    <label>Published by</label>
                    <div className="extraInfo">{game.publisher}</div>
                </div>
                <div className="developed">
                    <label>Developed by</label>
                    <div className="extraInfo">{game.developer}</div>
                </div>
                <div className="releaseDate">
                    <label>Release date</label>
                    <div className="date">{fullDate}</div>
                </div>
                <div className='links'>
                    <a target="_blank" href={game.game_url}>Game Link</a>
                    <a target="_blank" href={game.profile_url}>Profile</a>
                </div>
            </div>
            
        </div>
    )
}

export default Card