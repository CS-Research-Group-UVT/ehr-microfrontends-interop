import './modal.css'
import {useSelector, useDispatch} from 'react-redux'
import {closeModal} from '../../store/actions/modalActions.js'
import {useState} from 'react'
import {formattedPublishDate} from "../../common.js";

const Modal = () => {
    const dispatch = useDispatch()
    const { isOpen, payload } = useSelector(state => state.modal)
    const [embedHtml, setEmbedHtml] = useState('')
    const [copied, setCopied] = useState(false)
    const [customName, setCustomName] = useState(payload && payload.widget ? payload.widget.name : '')
    // New: state for FHIR endpoint customization
    const [fhirEndpoint, setFhirEndpoint] = useState('')
    // New: polling interval (in seconds), default 10
    const [pollIntervalSec, setPollIntervalSec] = useState(10)

    if (!isOpen) return null

    const onClose = () => dispatch(closeModal())

    const widget = payload && payload.widget ? payload.widget : null

    const esc = s => String(s === undefined || s === null ? '' : s)
        .replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')

    // Build a self-contained COMPONENT snippet (no full HTML doc)
    const buildEmbedHtml = (w, nameOverride, endpoint, intervalSec) => {
        const name = esc(nameOverride !== undefined ? nameOverride : w?.name)
        const description = esc(w?.description)
        // Use human-readable date in embed via formattedPublishDate
        const publishDateRaw = w?.publishDate
        const publishDate = esc(formattedPublishDate ? formattedPublishDate(publishDateRaw) : publishDateRaw)
        const downloads = esc(w?.downloads)
        const endpointEsc = esc(endpoint)
        const intervalMs = Math.max(1000, (parseInt(intervalSec, 10) || 10) * 1000)

        const style = `<style>\n  .embedded-widget{max-width:360px;font-family: sans-serif;background:#EDE5A6;color:#111;border-radius:10px;overflow:hidden;box-shadow:rgba(0,0,0,0.12) 0 8px 24px;display:flex;flex-direction:column;margin:0;padding:0;border:1px solid rgba(0,0,0,0.03)}\n  .ew-header{padding:16px;display:flex;align-items:center;justify-content:space-between}\n  .ew-name{margin:0;font-size:1.05rem;font-weight:700}\n  .ew-content{padding:0 16px 16px 16px;font-size:0.95rem;color:rgba(0,0,0,0.75);line-height:1.4}\n  .ew-footer{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 16px;background:#151515;color:whitesmoke;font-size:0.9rem}\n</style>`

        const script = `<script>
  (function(){
    var HARDCODED_URL = 'https://example.com/api/ping';
    window.EHR_FHIR_ENDPOINT = ${JSON.stringify(endpointEsc)};
    var _disposed = false;
    var intervalSec = ${intervalMs/1000};
    var nextPollSec = intervalSec;
    var pollTimerEl = null;
    function poll(){
      if (_disposed) return;
      try {
        fetch(HARDCODED_URL, { method: 'GET' })
          .then(function(r){ return r.text(); })
          .then(function(txt){
            console.log('[EmbeddedWidget] poll result:', txt);
          })
          .catch(function(err){
            console.warn('[EmbeddedWidget] poll error:', err);
          });
      } catch (e) {
        console.warn('[EmbeddedWidget] unexpected error:', e);
      }
      nextPollSec = intervalSec;
      updateTimerDisplay();
    }
    function updateTimerDisplay(){
      if (!pollTimerEl) {
        var container = document.currentScript && document.currentScript.parentElement;
        if (container) {
          pollTimerEl = container.querySelector('.ew-timer');
        }
      }
      if (pollTimerEl) {
        pollTimerEl.textContent = 'Next poll in ' + nextPollSec + 's';
      }
    }
    poll();
    updateTimerDisplay();
    var countdown = setInterval(function(){
      if (_disposed) return;
      if (nextPollSec > 0) {
        nextPollSec--;
        updateTimerDisplay();
      }
    }, 1000);
    var _timer = setInterval(function(){
      poll();
    }, intervalSec * 1000);
    try {
      var container = document.currentScript && document.currentScript.parentElement;
      if (container) {
        var observer = new MutationObserver(function(){
          if (!document.body.contains(container)) {
            _disposed = true;
            clearInterval(_timer);
            clearInterval(countdown);
            observer.disconnect();
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
      }
    } catch(e) {}
  })();
</script>`

        const markup = `<article class="embedded-widget" aria-label="Widget">
  <div class="ew-header">
    <h3 class="ew-name">${name}</h3>
    <div class="ew-actions"><a href="#">Download</a></div>
  </div>
  <div class="ew-content">
    <p>${description}</p>
    ${endpointEsc ? `<p><strong>FHIR endpoint:</strong> ${endpointEsc}</p>` : ''}
    <p style="opacity:.7"><small>Polling: every ${(intervalMs/1000)|0}s</small></p>
    <div class="ew-timer" style="margin-top:8px;font-size:0.95rem;color:#444">Next poll in ${(intervalMs/1000)|0}s</div>
  </div>
  <footer class="ew-footer">
    <div class="ew-meta">
      <span class="ew-date">${publishDate}</span>
      <span style="opacity:.6">•</span>
      <span class="ew-downloads">${downloads} downloads</span>
    </div>
    <div><a href="#">Download</a></div>
  </footer>
</article>`

        return `${style}\n${script}\n${markup}`
    }

    const handleDownload = (e) => {
        e && e.preventDefault()
        if (!widget) return
        const html = buildEmbedHtml(widget, customName, fhirEndpoint, pollIntervalSec)
        setEmbedHtml(html)
        setCopied(false)
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(embedHtml)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            // fallback: select textarea so user can copy manually
            const ta = document.getElementById('embed-textarea')
            if (ta) {
                ta.select()
            }
        }
    }

    return (
        <div className="modal-overlay" role="dialog" aria-modal="true" onClick={onClose}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
                <h2>{customName || (widget ? widget.name : 'Customize')}</h2>
                <div className="modal-body">
                    {widget ? (
                        <>
                            <label htmlFor="widget-name-input"><strong>Name:</strong></label>
                            <input
                                id="widget-name-input"
                                className="embed-input"
                                type="text"
                                value={customName}
                                onChange={e => setCustomName(e.target.value)}
                                style={{marginBottom: '1rem'}}
                            />
                            {/* New: FHIR endpoint input */}
                            <label htmlFor="fhir-endpoint-input"><strong>EHR FHIR endpoint:</strong></label>
                            <input
                                id="fhir-endpoint-input"
                                className="embed-input"
                                type="url"
                                placeholder="https://ehr.example.com/fhir"
                                value={fhirEndpoint}
                                onChange={e => setFhirEndpoint(e.target.value)}
                                style={{marginBottom: '1rem'}}
                            />
                            {/* New: polling interval slider */}
                            <label htmlFor="poll-interval-input"><strong>Polling interval (seconds):</strong></label>
                            <input
                                id="poll-interval-input"
                                className="embed-input"
                                type="range"
                                min={1}
                                max={120}
                                step={1}
                                value={pollIntervalSec}
                                onChange={e => setPollIntervalSec(Number(e.target.value))}
                                style={{marginBottom: '0.25rem'}}
                            />
                            <div style={{marginBottom:'1rem', fontSize:'0.9rem'}}>
                                {pollIntervalSec}s
                            </div>
                            <p className="modal-description">{widget.description}</p>
                            <p><strong>Downloads:</strong> {widget.downloads}</p>
                            <p><strong>Publish date:</strong> {formattedPublishDate(widget.publishDate)}</p>
                        </>
                    ) : (
                        <p>No item data</p>
                    )}
                </div>
                <div className="modal-actions">
                    <button className="button" onClick={onClose}>Close</button>
                    <button className="button primary" onClick={handleDownload}>Download</button>
                </div>

                {embedHtml && (
                    <div className="embed-panel">
                        <label htmlFor="embed-input">Embed HTML (single line):</label>
                        <input id="embed-input" className="embed-input" readOnly value={embedHtml.replace(/\n/g, ' ')} />
                        <label htmlFor="embed-textarea">Embed HTML (multi-line):</label>
                        <textarea id="embed-textarea" className="embed-textarea" readOnly value={embedHtml} />
                        <div style={{display:'flex',gap:'8px',marginTop:'8px'}}>
                            <button className="button primary" onClick={handleCopy}>{copied ? 'Copied' : 'Copy'}</button>
                            <button className="button" onClick={() => { setEmbedHtml('') }}>Close embed</button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}
export default Modal

