import type { HangarClientCore } from '../core.js';
import type { ProjectChannel, Color, ChannelFlag } from '../../types/index.js';

/** Form for creating a release channel. */
export interface CreateChannelForm {
  name: string;
  description: string;
  color: Color;
  flags: ChannelFlag[];
}

/** Form for editing an existing release channel. */
export interface EditChannelForm extends CreateChannelForm {
  id: number;
}

/** Internal API namespace for project release channels. */
export class InternalChannelsApi {
  constructor(private readonly core: HangarClientCore) {}

  /** Checks whether a color is available for a project channel. */
  checkColor(projectId: number, color: Color): Promise<void> {
    return this.core.requestVoid('internal/channels/checkColor', {
      query: { projectId, color },
    });
  }

  /** Checks whether a channel name is available for a project. */
  checkName(projectId: number, name: string): Promise<void> {
    return this.core.requestVoid('internal/channels/checkName', {
      query: { projectId, name },
    });
  }

  /** Returns all channels for a project. */
  getChannels(project: string): Promise<ProjectChannel[]> {
    return this.core.requestJson<ProjectChannel[]>(
      `internal/channels/${encodeURIComponent(project)}`,
    );
  }

  /** Creates a new channel for a project. */
  createChannel(projectId: number, form: CreateChannelForm): Promise<ProjectChannel> {
    return this.core.requestJson<ProjectChannel>(
      `internal/channels/${projectId}/create`,
      { method: 'POST', body: form },
    );
  }

  /** Edits an existing channel. */
  editChannel(projectId: number, form: EditChannelForm): Promise<void> {
    return this.core.requestVoid(
      `internal/channels/${projectId}/edit`,
      { method: 'POST', body: form },
    );
  }

  /** Deletes a channel from a project. */
  deleteChannel(project: string, channel: string): Promise<void> {
    return this.core.requestVoid(
      `internal/channels/${encodeURIComponent(project)}/delete/${encodeURIComponent(channel)}`,
      { method: 'POST', body: {} },
    );
  }
}
