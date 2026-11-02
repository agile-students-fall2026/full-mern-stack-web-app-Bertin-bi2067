import { useState, useEffect } from 'react'
import axios from 'axios'
import './AboutUs.css'
import loadingIcon from './loading.gif'

/**
 * A React component that shows the About Us page, with content retrieved from the back-end.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const AboutUs = props => {
  const [about, setAbout] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

  /**
   * A function that fetches the About Us content from the back-end server.
   */
  const fetchAbout = () => {
    axios
      .get(`${import.meta.env.VITE_SERVER_HOSTNAME}/about`)
      .then(response => {
        // axios bundles up all response data in response.data property
        setAbout(response.data)
      })
      .catch(err => {
        const errMsg = JSON.stringify(err, null, 2) // convert error object to a string so we can simply dump it to the screen
        setError(errMsg)
      })
      .finally(() => {
        // the response has been received, so remove the loading icon
        setLoaded(true)
      })
  }

  // fetch the content once when the component first loads
  useEffect(() => {
    fetchAbout()
  }, [])

  return (
    <>
      <h1>A little bit about me</h1>

      {error && <p>{error}</p>}
      {!loaded && <img src={loadingIcon} alt="loading" />}

      {about.imageUrl && (
        <img className="AboutUs-photo" src={about.imageUrl} alt={about.name} />
      )}
      {about.paragraphs &&
        about.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
    </>
  )
}

// make this component available to be imported into any other file
export default AboutUs