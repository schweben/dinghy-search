import styles from '../styles/results.module.css';

export default function Results(props) {
    return (
        <div>
        { props.dinghies?.map((dinghy) =>
        <div className={styles.result} key={dinghy.id}>
            { dinghy.imagePath ? (
                <img className={styles.background} src={dinghy.imagePath} alt={dinghy.name}/>
            ) : null }
            <h2>{dinghy.name}</h2>
            { dinghy.logoPath ? (
                <img className={styles.logo} src={dinghy.logoPath} alt={`${dinghy.name} class logo`}/>
            ) : null }
            <ul>
                <li><span className={styles.label}>LOA:</span> {dinghy.length}m</li>
                    <li><span className={styles.label}>Beam:</span> {dinghy.beam}m</li>
                    <li><span className={styles.label}>Weight</span>: {dinghy.hullWeight}kg</li>
                    <li><span className={styles.label}>PY Number:</span> {dinghy.yardstick}</li>
                    <li><span className={styles.label}>Rig:</span> {dinghy.rig}</li>
                    <li><span className={styles.label}>Crew:</span> {dinghy.crew}</li>
                    <li><span className={styles.label}>Sail area:</span> {dinghy.sailArea}m<sup>2</sup></li>
                {dinghy.symmetricSpinnaker || dinghy.asymmetricSpinnaker ? (
                        <li><span className={styles.label}>Spinnaker:</span>
                        <input type="checkbox" disabled="true" defaultChecked={dinghy.symmetricSpinnaker ? (true) : (false)} />Symmetric
                        <input type="checkbox" disabled="true" defaultChecked={dinghy.asymmetricSpinnaker ? (true) : (false)} />Asymmetric
                    </li>
                ) : null}
                {dinghy.symmetricSpinnaker || dinghy.asymmetricSpinnaker ? (
                        <li><span className={styles.label}>Spinnaker area:</span> {dinghy.spinnakerArea}m<sup>2</sup></li>
                ) : null}
                {dinghy.trapeze > 0 ? (<li><span className={styles.label}>Trapeze:</span> {dinghy.trapeze}</li>) : null}
                {dinghy.manufacturer ? (
                    <li><span className={styles.label}>Manufacturer:</span> {dinghy.manufacturer}</li>
                ) : null}
            </ul>
        </div>
        )}
        </div>
    )
}
