import { useParams } from 'react-router-dom'

export default function BlogPost() {
  const { slug } = useParams()

  return (
    <div className="section-padding container-max pt-24 max-w-2xl">
      <p className="text-muted text-sm font-mono mb-4">blog/{slug}</p>
      <h1 className="text-3xl font-bold mb-4">Post Title</h1>
      <p className="text-muted">Blog post content will render here.</p>
    </div>
  )
}
