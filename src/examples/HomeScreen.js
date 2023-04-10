  import React, { useState, useMemo, useRef } from 'react'
  import TinderCard from 'react-tinder-card'
  import { redirect } from 'react-router';
  import {Link} from 'react-router-dom';
  import { Col } from "react-bootstrap";

  const db = [
    {
      name: 'Richard Hendricks',
      url: 'https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg'
    },
    {
      name: 'Erlich Bachman',
      url: 'https://wl-brightside.cf.tsp.li/resize/728x/jpg/eb4/a0f/74ba7753259a98c8064255fb4a.jpg'
    },
    {
      name: 'Monica Hall',
      url: 'https://marketplace.canva.com/EAFSZhFumYM/1/0/1600w/canva-dark-red-neon-futuristic-instagram-profile-picture-MUPA4np8in0.jpg'
    },
    {
      name: 'Jared Dunn',
      url: 'https://e1.pxfuel.com/desktop-wallpaper/903/679/desktop-wallpaper-97-aesthetic-best-profile-pic-for-instagram-for-boy-instagram-dp-boys.jpg'
    },
    {
      name: 'Daniel Padilla',
      url: 'https://scontent.fcrk1-2.fna.fbcdn.net/v/t39.30808-6/286697533_726692555242281_5444981415792052215_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=174925&_nc_ohc=yyx9jk33P3cAX-yfqO1&_nc_ht=scontent.fcrk1-2.fna&oh=00_AfC5Jm149bCho3Stq4XpvyZKmqKEZI-hv37qrpokOaCjpw&oe=6429A499'
    }
  ]

  function Advanced () {
    const [currentIndex, setCurrentIndex] = useState(db.length - 1)
    const [lastDirection, setLastDirection] = useState()
    // used for outOfFrame closure
    const currentIndexRef = useRef(currentIndex)

    const childRefs = useMemo(
      () =>
        Array(db.length)
          .fill(0)
          .map((i) => React.createRef()),
      []
    )

    const updateCurrentIndex = (val) => {
      setCurrentIndex(val)
      currentIndexRef.current = val
    }

    const canGoBack = currentIndex < db.length - 1

    const canSwipe = currentIndex >= 0

    // set last direction and decrease current index
    const swiped = (direction, nameToDelete, index) => {
      setLastDirection(direction)
      updateCurrentIndex(index - 1)
    }

    const outOfFrame = (name, idx) => {
      console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
      // handle the case in which go back is pressed before card goes outOfFrame
      currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
      // TODO: when quickly swipe and restore multiple times the same card,
      // it happens multiple outOfFrame events are queued and the card disappear
      // during latest swipes. Only the last outOfFrame event should be considered valid
    }

    const swipe = async (dir) => {
      if (canSwipe && currentIndex < db.length) {
        await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
      }
    }

    // increase current index and show card
    const goBack = async () => {
      if (!canGoBack) return
      const newIndex = currentIndex + 1
      updateCurrentIndex(newIndex)
      await childRefs[newIndex].current.restoreCard()
    }

    return (
      <div>
        <link
          href='https://fonts.googleapis.com/css?family=Damion&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
          rel='stylesheet'
        />
        <h1>Amoretto</h1>
        <div className='cardContainer'>
          {db.map((character, index) => (
            <TinderCard
              ref={childRefs[index]}
              className='swipe'
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name, index)}
              onCardLeftScreen={() => outOfFrame(character.name, index)}
            >
              <div
                style={{ backgroundImage: 'url(' + character.url + ')' }}
                className='card'
              >
                <h3>{character.name}</h3>
              </div>
            </TinderCard>
          ))}
        </div>
        <div className='buttons'>
          <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
          <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
          <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button>
        </div>

        <div className='login'>
        <Col>
            Have an account ?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
            </Link>
          </Col>
        </div>

        <div className='register'>
        <Col>
            Don't have an account ?{" "}
            <Link to={redirect ? `/register?redirect=${redirect}` : "/Register"}>
              Register
            </Link>
          </Col>
        </div>
        {lastDirection ? (
          <h2 key={lastDirection} className='infoText'>
            You swiped {lastDirection}
          </h2>
        ) : (
          <h2 className='infoText'>
            Swipe a card or press a button to get Restore Card button visible!
          </h2>
        )}
      </div>
    )
  }


  export default Advanced
